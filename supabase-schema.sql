-- KOUVIA by Ebys Place - Supabase Schema & Row-Level Security Recipe
-- An Architectural blueprint for a premium beauty & braiding platform in Europe.

-- =====================================================================
-- 1. EXTENSIONS & ENUMS
-- =====================================================================
create extension if not exists "uuid-ossp";

create type user_role as enum ('client', 'braider', 'admin');
create type booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');

-- =====================================================================
-- 2. CORE TABLE DEFINITIONS
-- =====================================================================

-- 2.1 Profiles Table (Extends Supabase Auth users)
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text not null unique,
    full_name text,
    avatar_url text,
    role user_role default 'client'::user_role not null,
    phone_number text
);

-- Indexing for lookup performance
create index idx_profiles_role on public.profiles(role);

-- 2.2 Braiders Table
create table public.braiders (
    id uuid references public.profiles(id) on delete cascade primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    bio text,
    location text not null,
    base_rate_euros decimal(10, 2) not null default 0.00,
    price_tier text check (price_tier in ('€€', '€€€', '€€€€')) default '€€€',
    rating decimal(2,1) default 5.0 check (rating >= 1.0 and rating <= 5.0),
    is_verified boolean default false not null,
    availability_days text[] default '{}'::text[] not null, -- e.g. ['Mon', 'Wed', 'Fri']
    portfolio_images text[] default '{}'::text[] not null
);

create index idx_braiders_location on public.braiders(location);
create index idx_braiders_is_verified on public.braiders(is_verified) where is_verified = true;

-- 2.3 Braider Styles Joint / Association Table
create table public.techniques (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    description text,
    image_url text
);

create table public.braider_techniques (
    braider_id uuid references public.braiders(id) on delete cascade,
    technique_id uuid references public.techniques(id) on delete cascade,
    primary key (braider_id, technique_id)
);

-- 2.4 Bookings Table (Workflow management)
create table public.bookings (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    client_id uuid references public.profiles(id) on delete cascade not null,
    braider_id uuid references public.braiders(id) on delete cascade not null,
    technique_id uuid references public.techniques(id) on delete set null,
    appointment_date date not null,
    appointment_time time not null,
    status booking_status default 'pending'::booking_status not null,
    total_price decimal(10, 2) not null,
    notes text
);

create index idx_bookings_client on public.bookings(client_id);
create index idx_bookings_braider on public.bookings(braider_id);
create index idx_bookings_status on public.bookings(status);

-- 2.5 Realtime Notifications
create table public.notifications (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    recipient_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    message text not null,
    is_read boolean default false not null,
    booking_id uuid references public.bookings(id) on delete cascade
);

create index idx_notifications_recipient on public.notifications(recipient_id);
create index idx_notifications_unread on public.notifications(recipient_id) where is_read = false;

-- =====================================================================
-- 3. AUTO-UPDATE TIMESTAMP TRIGGER
-- =====================================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger tr_profiles_updated_at before update on public.profiles for each row execute procedure public.handle_updated_at();
create trigger tr_braiders_updated_at before update on public.braiders for each row execute procedure public.handle_updated_at();
create trigger tr_bookings_updated_at before update on public.bookings for each row execute procedure public.handle_updated_at();

-- =====================================================================
-- 4. PROFILE GENERATION FROM AUTH TRIGGER
-- =====================================================================
create or replace function public.handle_new_user_signup()
returns trigger as $$
declare
    user_fullname text;
    user_avatar text;
    user_role_assigned user_role;
begin
    -- Extract optional raw user metadata if present
    user_fullname := coalesce(new.raw_user_meta_data->>'full_name', '');
    user_avatar := coalesce(new.raw_user_meta_data->>'avatar_url', '');
    user_role_assigned := coalesce((new.raw_user_meta_data->>'role')::user_role, 'client'::user_role);

    insert into public.profiles (id, email, full_name, avatar_url, role)
    values (new.id, new.email, user_fullname, user_avatar, user_role_assigned);

    -- If registered as a braider, automatically bootstrap braider profile placeholder
    if user_role_assigned = 'braider'::user_role then
        insert into public.braiders (id, location, base_rate_euros, price_tier)
        values (new.id, 'Paris, France', 120.00, '€€€');
    end if;

    return new;
end;
$$ language plpgsql security definer;

create trigger tr_auth_signup_handler
after insert on auth.users
for each row execute procedure public.handle_new_user_signup();

-- =====================================================================
-- 5. ROW LAYER SECURITY (RLS) POLICIES
-- =====================================================================

-- Turn RLS ON for all tables
alter table public.profiles enable row level security;
alter table public.braiders enable row level security;
alter table public.bookings enable row level security;
alter table public.notifications enable row level security;
alter table public.techniques enable row level security;
alter table public.braider_techniques enable row level security;

-- Helper security function to verify current active user is administrator
create or replace function public.is_admin()
returns boolean as $$
begin
    return exists (
        select 1 from public.profiles
        where id = auth.uid() and role = 'admin'::user_role
    );
end;
$$ language plpgsql security definer;

-- 5.1 Profiles RLS Policies
create policy "Public profile read access" on public.profiles
    for select using (true);

create policy "Users can update their own profile details" on public.profiles
    for update using (auth.uid() = id);

create policy "Admins have superuser access to profiles" on public.profiles
    for all using (public.is_admin());

-- 5.2 Braiders RLS Policies
create policy "Public read access to verified braiders" on public.braiders
    for select using (true);

create policy "Braiders can perform full lifecycle edits on own braider card" on public.braiders
    for all using (auth.uid() = id);

create policy "Admins can moderate braiders" on public.braiders
    for all using (public.is_admin());

-- 5.3 Bookings RLS Policies
create policy "Clients can select and view their personal bookings" on public.bookings
    for select using (auth.uid() = client_id);

create policy "Braiders can select and view appointments queued to them" on public.bookings
    for select using (auth.uid() = braider_id);

create policy "Clients can submit layout scheduling requests" on public.bookings
    for insert with check (auth.uid() = client_id);

create policy "Stakeholders can patch update their active appointment row" on public.bookings
    for update using (auth.uid() = client_id or auth.uid() = braider_id);

create policy "Admins can handle and overview all booking logs" on public.bookings
    for all using (public.is_admin());

-- 5.4 Notifications RLS Policies
create policy "Users can only read and update their personal notices" on public.notifications
    for all using (auth.uid() = recipient_id);

create policy "Autonomous database insertions allowed" on public.notifications
    for insert with check (true);

-- 5.5 Techniques RLS Policies
create policy "Public read access to all techniques" on public.techniques
    for select using (true);

create policy "Admins can append and modify techniques" on public.techniques
    for all using (public.is_admin());

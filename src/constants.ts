/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Braider, StylingCategory } from './types';

export const BRAIDING_STYLES: StylingCategory[] = [
  {
    id: 'goddess-braids',
    name: 'Goddess Braids',
    description: 'Ethereal volume with delicate, flowing ringlets.',
    imageUrl: 'https://res.cloudinary.com/dfbweqelf/image/upload/v1776159339/Gemini_Generated_Image_3l0eht3l0eht3l0e_1_v7bwrj.png'
  },
  {
    id: 'boho-braids',
    name: 'Boho Braids',
    description: 'Effortless luxury blended with artistic, windswept curls.',
    imageUrl: 'https://res.cloudinary.com/dfbweqelf/image/upload/v1776158395/Gemini_Generated_Image_18i90718i90718i9_quwaol.png'
  },
  {
    id: 'cornrows',
    name: 'Cornrows',
    description: 'Precision patterns for listing geometric elegance.',
    imageUrl: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'knotless',
    name: 'Knotless',
    description: 'Seamless protective styles with a weightless finish.',
    imageUrl: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_BRAIDERS: Braider[] = [
  {
    id: '1',
    name: 'Elise Dupont',
    location: 'Paris, France',
    rating: 4.9,
    priceRange: '€€€',
    availability: ['Mon', 'Wed', 'Fri'],
    styles: ['Cornrows', 'Knotless'],
    imageUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=600',
    description: 'Specializing in intricate French-African fusion patterns with structural symmetry.'
  },
  {
    id: '2',
    name: 'Amara Okafor',
    location: 'London, UK',
    rating: 5.0,
    priceRange: '€€€€',
    availability: ['Tue', 'Thu', 'Sat'],
    styles: ['Goddess Braids', 'Boho Braids'],
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600',
    description: 'Award-winning master stylist focusing on sculptural art, scalp health, and premium fiber blending.'
  },
  {
    id: '3',
    name: 'Sofia Rossi',
    location: 'Milan, Italy',
    rating: 4.8,
    priceRange: '€€€',
    availability: ['Mon', 'Tue', 'Thu'],
    styles: ['Knotless', 'Boho Braids'],
    imageUrl: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?auto=format&fit=crop&q=80&w=600',
    description: 'Modern geometric hair design for Milan Fashion Week runways and editorial clients.'
  }
];

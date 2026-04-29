/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Braider, StylingCategory } from './types';

export const BRAIDING_STYLES: StylingCategory[] = [
  {
    id: 'cornrows',
    name: 'Cornrows',
    description: 'Precision patterns for lasting elegance.',
    imageUrl: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'box-braids',
    name: 'Box Braids',
    description: 'Classic versatility and protective charm.',
    imageUrl: 'https://images.unsplash.com/photo-1617391654484-289419692993?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'goddess-braids',
    name: 'Goddess Braids',
    description: 'Ethereal volume with feminine grace.',
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f80d91f1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'knotless',
    name: 'Knotless',
    description: 'Seamless comfort for a modern edge.',
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
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400',
    description: 'Specializing in intricate French-African fusion patterns.'
  },
  {
    id: '2',
    name: 'Amara Okafor',
    location: 'London, UK',
    rating: 5.0,
    priceRange: '€€€€',
    availability: ['Tue', 'Thu', 'Sat'],
    styles: ['Box Braids', 'Goddess Braids'],
    imageUrl: 'https://images.unsplash.com/photo-1523913509743-7fe432d69a40?auto=format&fit=crop&q=80&w=400',
    description: 'Award-winning master braider with a focus on scalp health.'
  },
  {
    id: '3',
    name: 'Sofia Rossi',
    location: 'Milan, Italy',
    rating: 4.8,
    priceRange: '€€€',
    availability: ['Mon', 'Tue', 'Thu'],
    styles: ['Knotless', 'Fulani Braids'],
    imageUrl: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?auto=format&fit=crop&q=80&w=400',
    description: 'Modern geometric styling for the fashion-forward individual.'
  }
];

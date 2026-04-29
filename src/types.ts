/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Braider {
  id: string;
  name: string;
  location: string;
  rating: number;
  priceRange: string;
  availability: string[]; // ['Mon', 'Tue', ...]
  styles: string[];
  imageUrl: string;
  description: string;
}

export interface StylingCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

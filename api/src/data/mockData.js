// Mock data only (no DB/auth yet). This module is the single source of truth for prototype state.

export const beers = [
  { id: 1, name: 'Hoppy Trails IPA', style: 'IPA', abv: 6.5 },
  { id: 2, name: 'Golden Hour Lager', style: 'Lager', abv: 5.0 },
  { id: 3, name: 'Midnight Stout', style: 'Stout', abv: 8.2 },
  { id: 4, name: 'Citrus Wheat', style: 'Wheat', abv: 4.7 },
  { id: 5, name: 'Pine Ridge Pale Ale', style: 'Pale Ale', abv: 5.6 }
];

export const stores = [
  { id: 1, name: 'Downtown Bottle Shop', location: 'Downtown' },
  { id: 2, name: 'Northside Market', location: 'Northside' },
  { id: 3, name: 'Lakeside Liquor', location: 'Lakeside' }
];

export const availability = [
  { beer_id: 1, store_id: 1, in_stock: true },
  { beer_id: 1, store_id: 2, in_stock: false },
  { beer_id: 2, store_id: 1, in_stock: true },
  { beer_id: 3, store_id: 3, in_stock: true },
  { beer_id: 4, store_id: 2, in_stock: true }
];

// In-memory collections for prototype writes.
export const ratings = [];
export const favorites = [];

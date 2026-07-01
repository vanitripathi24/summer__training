// Product data now comes live from the DummyJSON API — see
// src/services/dummyjsonApi.js. This file only keeps the static
// "Shop by Category" banner content, which is just promo imagery
// and isn't part of the product catalog.

export const categories = [
  {
    id: 'mens',
    title: "Men's Sale",
    subtitle: 'Up to 50% off',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=700&q=80',
    tag: 'mens',
  },
  {
    id: 'womens',
    title: "Women's Sale",
    subtitle: 'Up to 50% off',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80',
    tag: 'womens',
  },
  {
    id: 'kids',
    title: "Kids' Sale",
    subtitle: 'Up to 40% off',
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=700&q=80',
    tag: 'kids',
  },
  {
    id: 'originals',
    title: 'Originals Sale',
    subtitle: 'Up to 50% off',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=700&q=80',
    tag: 'originals',
  },
];

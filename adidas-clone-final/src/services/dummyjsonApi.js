// DummyJSON Products API integration
// Docs: https://dummyjson.com/docs/products#products-all
//
// DummyJSON has no "Adidas" catalog, so we use its two shoe categories
// (mens-shoes / womens-shoes) as the product source and reshape each
// DummyJSON product into the exact shape the rest of the app already
// expects (the same shape that used to come from src/data/products.js):
//   { id, name, category, price, originalPrice, discount, badge,
//     colors, image, hoverImage, rating, reviews, description, sizes, tag }

const BASE_URL = 'https://dummyjson.com';

// Maps our UI filter values to real DummyJSON categories
const CATEGORY_MAP = {
  all: ['mens-shoes', 'womens-shoes'],
  mens: ['mens-shoes'],
  womens: ['womens-shoes'],
};

// DummyJSON doesn't return shoe colors/sizes, so we derive a small,
// deterministic set per product (based on its id) to keep the existing
// color-swatch / size-picker UI working exactly as before.
const COLOR_PALETTES = [
  ['#000', '#fff', '#1a73e8'],
  ['#fff', '#1a73e8', '#000'],
  ['#e63946', '#000', '#fff'],
  ['#000', '#fff'],
  ['#2d6a4f', '#000', '#e76f51'],
  ['#fff', '#ffb3c1', '#caf0f8'],
  ['#1a73e8', '#000', '#fff'],
];

const SIZE_SETS = [
  [6, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
  [4, 4.5, 5, 5.5, 6, 6.5, 7, 8],
  [6, 7, 8, 8.5, 9, 10, 11, 12],
  [7, 7.5, 8, 8.5, 9, 9.5, 10, 11],
];

// Rough USD -> INR conversion so prices still feel like the original clone
const INR_RATE = 83;

function getBadge(p) {
  if (p.discountPercentage >= 20) return 'SALE';
  if (p.rating >= 4.6) return 'BEST SELLER';
  if (p.stock < 20) return 'HOT';
  return 'NEW';
}

// Turns a raw DummyJSON product into the shape the app's components expect
export function transformProduct(p) {
  const price = Math.max(1, Math.round(p.price * INR_RATE));
  const discount = Math.round(p.discountPercentage || 0);
  const originalPrice = discount > 0
    ? Math.round(price / (1 - discount / 100))
    : Math.round(price * 1.3);
  const images = p.images && p.images.length ? p.images : [p.thumbnail];
  const tag = p.category === 'womens-shoes' ? 'womens' : 'mens';

  return {
    id: String(p.id),
    name: p.title,
    category: p.category === 'womens-shoes' ? "Women's Shoes" : "Men's Shoes",
    price,
    originalPrice,
    discount,
    badge: getBadge(p),
    colors: COLOR_PALETTES[p.id % COLOR_PALETTES.length],
    image: images[0],
    hoverImage: images[1] || images[0],
    rating: Math.round((p.rating || 4.5) * 10) / 10,
    // DummyJSON only ships a few sample reviews per product, so we derive
    // a realistic-looking review count from them instead of showing "3".
    reviews: (p.reviews?.length || 1) * 350 + p.stock * 5,
    description: p.description,
    sizes: SIZE_SETS[p.id % SIZE_SETS.length],
    tag,
    _category: p.category, // kept internally for related-product lookups
  };
}

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

// Fetches a paginated, optionally category-filtered product list
export async function fetchProducts({ filter = 'all', limit = 12, skip = 0 } = {}) {
  const categories = CATEGORY_MAP[filter] || CATEGORY_MAP.all;

  if (categories.length === 1) {
    const data = await getJSON(
      `${BASE_URL}/products/category/${categories[0]}?limit=${limit}&skip=${skip}`
    );
    return { products: data.products.map(transformProduct), total: data.total };
  }

  // "All" combines both shoe categories client-side so we can paginate
  // across the full combined set.
  const results = await Promise.all(
    categories.map((c) => getJSON(`${BASE_URL}/products/category/${c}?limit=0`))
  );
  const combined = results.flatMap((r) => r.products);
  const total = combined.length;
  const page = combined.slice(skip, skip + limit).map(transformProduct);
  return { products: page, total };
}

// Fetches a single product by id, for the Product detail page
export async function fetchProductById(id) {
  const data = await getJSON(`${BASE_URL}/products/${id}`);
  return transformProduct(data);
}

// Fetches related products from the same DummyJSON category
export async function fetchRelatedProducts(category, excludeId, limit = 4) {
  const data = await getJSON(`${BASE_URL}/products/category/${category}?limit=0`);
  return data.products
    .filter((p) => String(p.id) !== String(excludeId))
    .slice(0, limit)
    .map(transformProduct);
}

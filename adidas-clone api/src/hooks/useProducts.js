import { useState, useEffect } from 'react';

const API_BASE = 'https://dummyjson.com/products';
const PRODUCTS_PER_PAGE = 10;

const SPORTS_CATEGORIES = [
  'mens-shoes',
  'womens-shoes',
  'mens-shirts',
  'womens-tops',
  'womens-dresses',
  'sports-accessories',
  'sunglasses',
  'mens-watches',
  'womens-bags',
];

export function useProducts(page = 1) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all(
      SPORTS_CATEGORIES.map((cat) =>
        fetch(`${API_BASE}/category/${cat}?limit=50&select=id,title,price,discountPercentage,rating,stock,brand,category,thumbnail,images,description,tags,reviews`)
          .then((res) => res.ok ? res.json() : { products: [] })
          .then((data) => data.products ?? [])
          .catch(() => [])
      )
    )
      .then((results) => {
        setAllProducts(results.flat());
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const total = allProducts.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const products = allProducts.slice(skip, skip + PRODUCTS_PER_PAGE);

  return { products, total, totalPages, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
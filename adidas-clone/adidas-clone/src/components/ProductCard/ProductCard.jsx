import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function renderStars(rating) {
  const stars = [];
  const full = Math.floor(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`star${i > full ? ' empty' : ''}`}>★</span>
    );
  }
  return stars;
}

function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  function handleQuickAdd(e) {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleWishlist(e) {
    e.preventDefault();
    setLiked(!liked);
  }

  const badgeClass = product.badge === 'SALE' ? 'sale' : product.badge === 'NEW' ? 'new' : '';

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image-wrap">
        {/* Badge */}
        {product.badge && (
          <span className={`product-badge ${badgeClass}`}>{product.badge}</span>
        )}

        {/* Wishlist */}
        <button
          className={`product-wishlist-btn${liked ? ' liked' : ''}`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <HeartIcon />
        </button>

        {/* Images */}
        <img
          className="img-main"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        <img
          className="img-hover"
          src={product.hoverImage}
          alt={`${product.name} alternate view`}
          loading="lazy"
        />

        {/* Quick add */}
        <button className="product-quick-add" onClick={handleQuickAdd}>
          {added ? '✓ Added to Bag' : 'Quick Add'}
        </button>
      </div>

      <div className="product-card-info">
        <p className="product-card-name">{product.name}</p>
        <p className="product-card-category">{product.category}</p>

        {/* Color swatches */}
        <div className="product-card-colors">
          {product.colors.slice(0, 4).map((color, i) => (
            <span
              key={i}
              className={`color-swatch${color === '#fff' || color === '#ffffff' ? ' white' : ''}`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span style={{ fontSize: '11px', color: '#767677', lineHeight: '14px' }}>
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="product-card-rating">
          <div className="stars">{renderStars(product.rating)}</div>
          <span className="review-count">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="product-card-prices">
          <span className="price-current">{formatPrice(product.price)}</span>
          <span className="price-original">{formatPrice(product.originalPrice)}</span>
          <span className="price-discount">({product.discount}% off)</span>
        </div>
      </div>
    </Link>
  );
}

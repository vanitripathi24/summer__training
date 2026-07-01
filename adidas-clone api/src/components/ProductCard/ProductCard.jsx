import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import "./ProductCard.css";
import { useCart } from "../../hooks/useCart";
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function formatPrice(price) {
  return '$' + Number(price).toFixed(2);
}

function getDiscountedPrice(price, discount) {
  return price * (1 - discount / 100);
}

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const images = product.images && product.images.length > 1 ? product.images : [product.thumbnail, product.thumbnail];
  const discounted = getDiscountedPrice(product.price, product.discountPercentage);
  const isLowStock = product.stock <= 10;
  const { addToCart } = useCart();

  function handleQuickAdd(e) {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleWishlist(e) {
    e.preventDefault();
    setLiked(!liked);
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-card-image-wrap">
        {product.discountPercentage >= 10 && (
          <span className="product-badge sale">-{Math.round(product.discountPercentage)}%</span>
        )}
        {isLowStock && (
          <span className="product-badge low-stock">Low Stock</span>
        )}

        <button
          className={`product-wishlist-btn${liked ? ' liked' : ''}`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <HeartIcon />
        </button>

        <img
          className="img-main"
          src={hovered && images[1] ? images[1] : images[0]}
          alt={product.title}
          loading="lazy"
          onError={(e) => { e.target.src = product.thumbnail; }}
        />

        <button
  onClick={(e) => {
    e.preventDefault();
    addToCart(product);
  }}
>
  Add To Cart
</button>
      </div>

      <div className="product-card-info">
        <p className="product-card-category">{product.brand || product.category}</p>
        <p className="product-card-name">{product.title}</p>

        {product.tags && product.tags.length > 0 && (
          <div className="product-card-tags">
            {product.tags.slice(0, 2).map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{ fontSize: '10px', height: '18px' }} />
            ))}
          </div>
        )}

        <div className="product-card-rating">
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <span className="review-count">({product.rating?.toFixed(1)})</span>
        </div>

        <div className="product-card-prices">
          <span className="price-current">{formatPrice(discounted)}</span>
          {product.discountPercentage > 0 && (
            <span className="price-original">{formatPrice(product.price)}</span>
          )}
          {product.discountPercentage >= 5 && (
            <span className="price-discount">({Math.round(product.discountPercentage)}% off)</span>
          )}
        </div>
      </div>
    </Link>
  );
}

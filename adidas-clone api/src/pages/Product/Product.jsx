import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProduct, useProducts } from '../../hooks/useProducts';

import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

import './Product.css';

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <button className={`accordion-trigger${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
        {title}<PlusIcon />
      </button>
      <div className={`accordion-body${open ? ' open' : ''}`}>{children}</div>
    </div>
  );
}

function formatPrice(price) {
  return '$' + Number(price).toFixed(2);
}

function StockBadge({ stock }) {
  if (stock === 0) return <span className="stock-badge out">Out of Stock</span>;
  if (stock <= 5) return <span className="stock-badge critical">Only {stock} left!</span>;
  if (stock <= 15) return <span className="stock-badge low">Low Stock — {stock} left</span>;
  return <span className="stock-badge in">In Stock</span>;
}

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div>
          <span className="reviewer-name">{review.reviewerName}</span>
          <Rating value={review.rating} readOnly size="small" />
        </div>
        <span className="review-date">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
      <p className="review-comment">{review.comment}</p>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="product-detail-container">
      <div className="product-gallery">
        <div className="product-thumbnails">
          {[...Array(4)].map((_, i) => <Skeleton key={i} variant="rectangular" width={80} height={80} />)}
        </div>
        <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: '1/1' }} />
      </div>
      <div>
        <Skeleton width="30%" height={20} />
        <Skeleton width="80%" height={40} sx={{ mt: 1 }} />
        <Skeleton width="50%" height={30} sx={{ mt: 2 }} />
        <Skeleton width="60%" height={40} sx={{ mt: 2 }} />
        <Skeleton width="100%" height={120} sx={{ mt: 3 }} />
      </div>
    </div>
  );
}

export default function Product() {
  const { product_id } = useParams();
  const { product, loading, error } = useProduct(product_id);
  const { products: related } = useProducts(1);

  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [mainImg, setMainImg] = useState(0);
  const [liked, setLiked] = useState(false);

  if (loading) {
    return (
      <div className="product-page">
        <Navbar />
        <ProductDetailSkeleton />
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <Navbar />
        <div className="product-not-found">
          <Alert severity="error" sx={{ mb: 2 }}>{error || 'Product not found'}</Alert>
          <Link to="/home">← Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.thumbnail];
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  // Simulated sizes from product's minimumOrderQuantity or a default set
  const sizes = [6, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12];
  const relatedProducts = related.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallbackRelated = related.filter((p) => p.id !== product.id).slice(0, 4);
  const displayRelated = relatedProducts.length >= 2 ? relatedProducts : fallbackRelated;

  // Rating distribution (simulated from reviews)
  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({
    stars: r,
    count: product.reviews?.filter((rv) => rv.rating === r).length ?? 0,
  }));

  function handleAddToBag() {
    if (!selectedSize) { alert('Please select a size first.'); return; }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="product-page">
      <Navbar />

      <nav className="breadcrumb">
        <Link to="/home">Home</Link>
        <span>/</span>
        <Link to="/home">{product.category}</Link>
        <span>/</span>
        <span>{product.title}</span>
      </nav>

      <div className="product-detail-container">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-thumbnails">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} view ${i + 1}`}
                className={`product-thumb${mainImg === i ? ' selected' : ''}`}
                onClick={() => setMainImg(i)}
                loading="lazy"
                onError={(e) => { e.target.src = product.thumbnail; }}
              />
            ))}
          </div>
          <div className="product-main-image">
            {product.discountPercentage >= 10 && (
              <span className="product-main-badge">-{Math.round(product.discountPercentage)}% OFF</span>
            )}
            <img
              src={images[mainImg]}
              alt={product.title}
              onError={(e) => { e.target.src = product.thumbnail; }}
            />
          </div>
        </div>

        {/* Info Panel */}
        <div className="product-info-panel">
          <div className="product-meta-row">
            <p className="product-info-category">{product.category}</p>
            {product.brand && <Chip label={product.brand} size="small" variant="outlined" />}
          </div>

          <h1 className="product-info-name">{product.title}</h1>

          {/* Stock */}
          <StockBadge stock={product.stock} />

          {/* Rating */}
          <div className="product-rating-row">
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
            <span>{product.rating?.toFixed(1)} ({product.reviews?.length ?? 0} Reviews)</span>
          </div>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="product-tags-row">
              {product.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: '11px' }} />
              ))}
            </div>
          )}

          {/* Price */}
          <div className="product-price-block">
            <span className="product-price-current">{formatPrice(discountedPrice)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="product-price-original">{formatPrice(product.price)}</span>
                <span className="product-price-badge">{Math.round(product.discountPercentage)}% Off</span>
              </>
            )}
          </div>

          {/* Size selection */}
          <div className="product-size-section">
            <div className="size-section-header">
              <label>Size{selectedSize ? `: UK ${selectedSize}` : ' (Select a size)'}</label>
              <button className="size-guide-link">Size Guide</button>
            </div>
            <div className="product-size-grid">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn${selectedSize === size ? ' selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  UK {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="product-cta-group">
            <button className={`btn-add-to-bag${added ? ' added' : ''}`} onClick={handleAddToBag}>
              {added ? '✓ Added to Bag!' : product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
            </button>
            <button className={`btn-wishlist${liked ? ' liked' : ''}`} onClick={() => setLiked(!liked)}>
              <HeartIcon />
              {liked ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Shipping info */}
          <div className="product-shipping-info">
            <span>🚚 Free shipping on orders over $49</span>
            <span>↩ Free 30-day returns</span>
            {product.shippingInformation && <span>📦 {product.shippingInformation}</span>}
          </div>

          {/* Accordion */}
          <div className="product-accordion">
            <AccordionItem title="Product Description">
              <p>{product.description}</p>
              {product.warrantyInformation && (
                <p style={{ marginTop: '8px', color: '#555' }}>Warranty: {product.warrantyInformation}</p>
              )}
            </AccordionItem>
            <AccordionItem title="Specifications">
              <div className="product-specs-grid">
                {product.weight && <><span>Weight</span><span>{product.weight}g</span></>}
                {product.dimensions && (
                  <>
                    <span>Dimensions</span>
                    <span>{product.dimensions.width}W × {product.dimensions.height}H × {product.dimensions.depth}D cm</span>
                  </>
                )}
                {product.sku && <><span>SKU</span><span>{product.sku}</span></>}
                {product.availabilityStatus && <><span>Availability</span><span>{product.availabilityStatus}</span></>}
                {product.returnPolicy && <><span>Return Policy</span><span>{product.returnPolicy}</span></>}
                <span>Min. Order</span><span>{product.minimumOrderQuantity ?? 1} unit(s)</span>
              </div>
            </AccordionItem>
            <AccordionItem title="Delivery & Returns">
              <p>{product.shippingInformation ?? 'Standard shipping available. See checkout for exact timelines.'}</p>
              <p style={{ marginTop: '8px' }}>{product.returnPolicy ?? 'Free returns within 30 days. Items must be unused and in original packaging.'}</p>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      {product.reviews?.length > 0 && (
        <section className="reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-overview">
            <div className="reviews-score">
              <span className="big-score">{product.rating?.toFixed(1)}</span>
              <Rating value={product.rating} precision={0.1} readOnly size="large" />
              <span className="review-total">{product.reviews.length} reviews</span>
            </div>
            <div className="reviews-distribution">
              {ratingCounts.map(({ stars, count }) => (
                <div key={stars} className="rating-bar-row">
                  <span>{stars}★</span>
                  <LinearProgress
                    variant="determinate"
                    value={product.reviews.length ? (count / product.reviews.length) * 100 : 0}
                    sx={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: '#000' } }}
                  />
                  <span className="bar-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <Divider sx={{ my: 3 }} />
          <div className="reviews-list">
            {product.reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* Related products */}
      {displayRelated.length > 0 && (
        <section className="related-section">
          <h2>You May Also Like</h2>
          <div className="related-grid">
            {displayRelated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import OfferBanner from '../../components/OfferBanner/OfferBanner';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import ProductCard from '../../components/ProductCard/ProductCard';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import { useProducts } from '../../hooks/useProducts';
import './Home.css';


const TruckIcon = () => (
  <svg className="trust-badge-icon" viewBox="0 0 24 24">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 5v3h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const ReturnIcon = () => (
  <svg className="trust-badge-icon" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
  </svg>
);
const ShieldIcon = () => (
  <svg className="trust-badge-icon" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const TagIcon = () => (
  <svg className="trust-badge-icon" viewBox="0 0 24 24">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

function ProductSkeleton() {
  return (
    <div className="product-skeleton">
      <Skeleton variant="rectangular" width="100%" height={280} animation="wave" />
      <Skeleton width="60%" height={20} sx={{ mt: 1 }} animation="wave" />
      <Skeleton width="90%" height={20} animation="wave" />
      <Skeleton width="40%" height={20} animation="wave" />
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState(1);
  const { products, total, totalPages, loading, error } = useProducts(page);

  function handlePageChange(_, value) {
    setPage(value);
    // Scroll back up to product section smoothly
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="home-page">
      <Navbar />
      <HeroBanner />
      <OfferBanner />
      <CategoryGrid />
      <CountdownTimer />

      {/* Products section */}
      <section className="products-section" id="products-section">
        <div className="products-section-header">
          <div>
            <h2>All Products</h2>
            {!loading && total > 0 && (
              <p className="products-count">
                Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, total)} of {total} products
              </p>
            )}
          </div>
          <Link to="/home">View All</Link>
        </div>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to load products: {error}. Please try again.
          </Alert>
        )}

        <div className="products-grid">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>

        {/* MUI Pagination */}
        {!loading && totalPages > 1 && (
          <div className="pagination-wrap">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: 'inherit',
                  fontWeight: 700,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                },
                '& .Mui-selected': {
                  backgroundColor: '#000 !important',
                  color: '#fff',
                },
                '& .MuiPaginationItem-root:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            />
            <p className="pagination-hint">Page {page} of {totalPages}</p>
          </div>
        )}
      </section>

      {/* Promo full-width banner */}
      <div className="promo-strip">
        <div className="promo-strip-inner">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=80"
            alt="adiClub"
            loading="lazy"
          />
          <div className="promo-strip-content">
            <h2>Join adiClub. Get More.</h2>
            <p>Earn points on every purchase. Unlock exclusive rewards and early sale access.</p>
            <Link to="/about" className="promo-cta">Join Free</Link>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="trust-badges">
        <div className="trust-badge"><TruckIcon /><h4>Free Shipping</h4><p>On all orders above $49. Fast delivery.</p></div>
        <div className="trust-badge"><ReturnIcon /><h4>Easy Returns</h4><p>30-day hassle-free return policy.</p></div>
        <div className="trust-badge"><ShieldIcon /><h4>Secure Payments</h4><p>100% secure checkout with multiple payment options.</p></div>
        <div className="trust-badge"><TagIcon /><h4>Authentic Products</h4><p>All products are 100% genuine and quality checked.</p></div>
      </div>

      

      <Footer />
    </div>
  );
}

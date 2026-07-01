import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=1600&q=85',
    eyebrow: 'End of Season Sale',
    title: 'Flat 30% Off\nEverything',
    subtitle: 'Shop the biggest sale of the season. Shoes, clothing and accessories at unbeatable prices.',
    primaryLabel: 'Shop Now',
    primaryLink: '/home',
    secondaryLabel: 'Explore Sale',
    secondaryLink: '/home',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=85',
    eyebrow: 'New Collection',
    title: 'Ultraboost\n23',
    subtitle: 'Engineered for incredible energy return. Feel every run like never before.',
    primaryLabel: 'Shop Ultraboost',
    primaryLink: '/product/ultraboost-23',
    secondaryLabel: 'Learn More',
    secondaryLink: '/product/ultraboost-23',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85',
    eyebrow: "Women's Sale",
    title: "Her Game.\nHer Rules.",
    subtitle: 'Performance and style for every woman. Up to 50% off on selected styles.',
    primaryLabel: "Shop Women's",
    primaryLink: '/home',
    secondaryLabel: 'View All',
    secondaryLink: '/home',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1600&q=85',
    eyebrow: 'adidas Originals',
    title: 'Icons\nNever Die.',
    subtitle: 'Stan Smith. Samba. Superstar. The classics that defined street culture.',
    primaryLabel: 'Shop Originals',
    primaryLink: '/product/stan-smith',
    secondaryLabel: 'Discover',
    secondaryLink: '/home',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goTo(index) {
    setCurrent((index + slides.length) % slides.length);
  }

  return (
    <section className="hero-banner" aria-label="Hero Banner">
      {slides.map((slide, i) => (
        <div key={slide.id} className={`hero-slide${i === current ? ' active' : ''}`}>
          <img src={slide.image} alt={slide.title.replace('\n', ' ')} loading={i === 0 ? 'eager' : 'lazy'} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">{slide.eyebrow}</p>
            <h1 className="hero-title">
              {slide.title.split('\n').map((line, j) => (
                <span key={j}>{line}<br /></span>
              ))}
            </h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <div className="hero-buttons">
              <Link to={slide.primaryLink} className="hero-btn-primary">
                {slide.primaryLabel}
              </Link>
              <Link to={slide.secondaryLink} className="hero-btn-secondary">
                {slide.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Prev/Next arrows */}
      <button className="hero-arrow prev" onClick={() => goTo(current - 1)} aria-label="Previous">
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button className="hero-arrow next" onClick={() => goTo(current + 1)} aria-label="Next">
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      {/* Dot indicators */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

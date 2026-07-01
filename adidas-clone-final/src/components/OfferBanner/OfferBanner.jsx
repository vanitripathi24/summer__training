import { Link } from 'react-router-dom';
import './OfferBanner.css';

const offerCards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900&q=80',
    eyebrow: "Men's Sale",
    title: 'Up to 50%\nOff',
    link: '/home',
    label: "Shop Men's",
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
    eyebrow: "Women's Sale",
    title: 'Up to 50%\nOff',
    link: '/home',
    label: "Shop Women's",
  },
];

export default function OfferBanner() {
  return (
    <>
      {/* Stats strip */}
      <div className="offer-strip">
        <div className="offer-strip-inner">
          <div className="offer-strip-item">
            <strong>FLAT 30% OFF</strong>
            <span>On all products</span>
          </div>
          <div className="offer-strip-divider" />
          <div className="offer-strip-item">
            <strong>+15% EXTRA</strong>
            <span>Orders above ₹4,999</span>
          </div>
          <div className="offer-strip-divider" />
          <div className="offer-strip-item">
            <strong>FREE SHIPPING</strong>
            <span>On orders above ₹999</span>
          </div>
          <div className="offer-strip-divider" />
          <div className="offer-strip-item">
            <strong>EASY RETURNS</strong>
            <span>30-day return policy</span>
          </div>
        </div>
      </div>

      {/* Big category offer cards */}
      <div className="offer-banners">
        {offerCards.map((card) => (
          <div className="offer-card" key={card.id}>
            <img src={card.image} alt={card.title.replace('\n', ' ')} loading="lazy" />
            <div className="offer-card-overlay" />
            <div className="offer-card-content">
              <p className="eyebrow">{card.eyebrow}</p>
              <h3>
                {card.title.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </h3>
              <Link to={card.link} className="offer-card-btn">
                {card.label}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

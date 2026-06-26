import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from "../../assets/adidas-logo.png";

<div className="logo">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
    alt="Adidas"
    width="70"
  />
</div>

import adidasLogo from '../../assets/adidas-logo.png';

const AdidasLogo = () => (
  <img src={adidasLogo} alt="adidas" style={{ height: '60px', width: 'auto' }} />
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const navLinks = [
  { label: 'New & Trending', path: '/home' },
  {
    label: 'Men',
    dropdown: [
      { label: 'Shoes', path: '/home' },
      { label: 'Clothing', path: '/home' },
      { label: 'Accessories', path: '/home' },
      { label: 'Sport', path: '/home' },
    ],
  },
  {
    label: 'Women',
    dropdown: [
      { label: 'Shoes', path: '/home' },
      { label: 'Clothing', path: '/home' },
      { label: 'Accessories', path: '/home' },
      { label: 'Sport', path: '/home' },
    ],
  },
  {
    label: 'Kids',
    dropdown: [
      { label: 'Boys', path: '/home' },
      { label: 'Girls', path: '/home' },
      { label: 'Infants', path: '/home' },
    ],
  },
  {
    label: 'Originals',
    dropdown: [
      { label: 'Samba', path: '/product/samba-og' },
      { label: 'Gazelle', path: '/product/gazelle' },
      { label: 'Stan Smith', path: '/product/stan-smith' },
      { label: 'Forum', path: '/product/forum-low' },
      { label: 'Superstar', path: '/product/superstar' },
    ],
  },
  {
    label: 'More',
    dropdown: [
      { label: 'About Adidas', path: '/about' },
      { label: 'Sustainability', path: '/home' },
      { label: 'Gift Cards', path: '/home' },
      { label: 'Store Locator', path: '/home' },
    ],
  },
  { label: 'Sale', path: '/home', sale: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/home');
      setSearchOpen(false);
    }
  }

  return (
    <header className="navbar-wrapper">
      <div className="navbar-topbar">
        <span>🎉 END OF SEASON SALE — FLAT 30% OFF + EXTRA 15% ON ORDERS ABOVE ₹4,999</span>
      </div>

      <nav className="navbar-main">
        <Link to="/home" className="navbar-logo">
          <AdidasLogo />
        </Link>

        <div className="navbar-links">
          {navLinks.map((item) => (
            <div className="nav-item" key={item.label}>
              {item.dropdown ? (
                <>
                  <span className={`nav-link${item.sale ? ' sale-link' : ''}`}>
                    {item.label}
                  </span>
                  <div className="nav-dropdown">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className="nav-dropdown-link"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-link${item.sale ? ' sale-link' : ''}`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="navbar-icons">
          {searchOpen ? (
            <form className="navbar-search-bar" onSubmit={handleSearchSubmit}>
              <SearchIcon />
              <input
                autoFocus
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setSearchOpen(false)}
              />
            </form>
          ) : (
            <button className="navbar-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <SearchIcon />
            </button>
          )}
          <button className="navbar-icon-btn" aria-label="Account">
            <UserIcon />
          </button>
          <button className="navbar-icon-btn" aria-label="Wishlist">
            <HeartIcon />
          </button>
          <button className="navbar-icon-btn" aria-label="Cart">
            <CartIcon />
            <span className="cart-count">0</span>
          </button>
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-menu${mobileOpen ? ' open' : ''}`}>
        <Link to="/home" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>New & Trending</Link>
        <Link to="/home" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Men</Link>
        <Link to="/home" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Women</Link>
        <Link to="/home" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Kids</Link>
        <Link to="/home" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Originals</Link>
        <Link to="/about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>About</Link>
        <Link to="/home" className="mobile-nav-link sale" onClick={() => setMobileOpen(false)}>Sale</Link>
      </div>
    </header>
  );
}

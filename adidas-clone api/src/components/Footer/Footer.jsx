import './Footer.css';

const AdidasLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 19.5h5.1l1.5-2.6h6.8l1.5 2.6H22L12 2zm0 4.4l2.4 4.2H9.6L12 6.4z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const PlayStoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
  </svg>
);

const footerLinks = [
  {
    heading: 'Help',
    links: ['Help & FAQs', 'Order Tracking', 'Returns & Refunds', 'Size Guide', 'Store Locator', 'Contact Us'],
  },
  {
    heading: 'Company',
    links: ['About Adidas', 'Careers', 'Press', 'Sustainability', 'Investor Relations'],
  },
  {
    heading: 'Explore',
    links: ['New Arrivals', 'Bestsellers', 'adidas Originals', 'Sale', 'Gift Cards', 'Customize'],
  },
  {
    heading: 'Account',
    links: ['Sign In', 'Create Account', 'adiClub', 'My Orders', 'My Wishlist'],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-text">
          <h3>Sign Up For adiClub</h3>
          <p>Get early access, exclusive offers and special discounts.</p>
        </div>
        <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email address" />
          <button type="submit">Join</button>
        </form>
      </div>

      {/* Main links */}
      <div className="footer-top">
        {footerLinks.map((col) => (
          <div className="footer-col" key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social + App */}
      <div className="footer-social">
        <div>
          <p className="footer-social-title">Follow Us</p>
          <div className="social-icons">
            <a href="#" className="social-icon-btn" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" className="social-icon-btn" aria-label="Twitter / X"><TwitterIcon /></a>
            <a href="#" className="social-icon-btn" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" className="social-icon-btn" aria-label="YouTube"><YoutubeIcon /></a>
          </div>
        </div>
        <div>
          <p className="footer-social-title">Download the App</p>
          <div className="app-badges">
            <a href="#" className="app-badge" aria-label="App Store">
              <AppleIcon />
              <div className="app-badge-text">
                <small>Download on the</small>
                <span>App Store</span>
              </div>
            </a>
            <a href="#" className="app-badge" aria-label="Google Play">
              <PlayStoreIcon />
              <div className="app-badge-text">
                <small>Get it on</small>
                <span>Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-logo">
          <AdidasLogo />
          <span style={{ fontSize: '13px', color: '#767677' }}>adidas India</span>
        </div>
        <p className="footer-copyright">© 2025 adidas India Marketing Pvt. Ltd.</p>
        <div className="footer-legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Cookie Settings</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}

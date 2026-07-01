function MegaMenu({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div
      className="mega-menu"
      onMouseLeave={onClose}
    >
      <div>
        <h4>FEATURED</h4>
        <p>New Arrivals</p>
        <p>Best Sellers</p>
        <p>Sale</p>
      </div>

      <div>
        <h4>SHOES</h4>
        <p>Running</p>
        <p>Football</p>
        <p>Training</p>
      </div>

      <div>
        <h4>CLOTHING</h4>
        <p>T-Shirts</p>
        <p>Jackets</p>
        <p>Shorts</p>
      </div>

      <div>
        <h4>ACCESSORIES</h4>
        <p>Bags</p>
        <p>Caps</p>
        <p>Socks</p>
      </div>
    </div>
  );
}

export default MegaMenu;
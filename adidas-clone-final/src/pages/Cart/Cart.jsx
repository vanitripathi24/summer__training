import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../hooks/useCart';
import './Cart.css';

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

export default function Cart() {
  // Everything cart-related comes from the custom hook —
  // this component never touches CartContext directly.
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  const isEmpty = cartItems.length === 0;
  const shippingFee = totalPrice >= 999 || totalPrice === 0 ? 0 : 99;
  const grandTotal = totalPrice + shippingFee;

  return (
    <div className="cart-page">
      <Navbar />

      <div className="cart-container">
        <h1 className="cart-heading">
          Shopping Bag {!isEmpty && <span>({totalItems} item{totalItems > 1 ? 's' : ''})</span>}
        </h1>

        {isEmpty ? (
          <div className="cart-empty">
            <BagIcon />
            <h2>Your Bag is Empty</h2>
            <p>Looks like you haven't added anything to your bag yet.</p>
            <Link to="/home">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items list */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={`${item.id}-${item.size}`}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-size">Size: UK {item.size}</p>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                  </div>

                  <div className="cart-item-actions">
                    <p className="cart-item-line-total">
                      {formatPrice(item.price * item.quantity)}
                    </p>

                    <div className="qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => decreaseQuantity(item.id, item.size)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => increaseQuantity(item.id, item.size)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="cart-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span className={shippingFee === 0 ? 'free-tag' : ''}>
                  {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              <button className="checkout-btn">Proceed to Checkout</button>
              <Link to="/home" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

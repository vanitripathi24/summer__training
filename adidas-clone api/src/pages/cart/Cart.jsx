import "./Cart.css";

import { useCart }
from "../../hooks/useCart";

function Cart() {

  const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  totalPrice
} = useCart();
  return (

    <div className="cart-page">

      <h1>Your Cart</h1>

      {

        cartItems.length === 0 ?

        <h2>Cart is Empty</h2>

        :

        cartItems.map(item => (

          <div
            key={item.id}
            className="cart-item"
          >

            <img
              src={item.thumbnail}
              alt={item.title}
            />

            <div>

              <h3>{item.title}</h3>

              <p>₹ {item.price}</p>

              <p>
                Quantity:
                {item.quantity}
              </p>

            </div>

            <div>

              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
              >
                -
              </button>

              <button
                onClick={() =>
                  increaseQuantity(item.id)
                }
              >
                +
              </button>

            </div>

          </div>

        ))

      }

      <h2>

        Total:

        ₹ {totalPrice.toFixed(2)}

      </h2>

    </div>

  );

}

export default Cart;
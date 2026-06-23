import {
  FaRegHeart,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";

function Navbar() {
  return (
    <>
      <div className="top-strip">
        IMPORTANT ADICLUB TERMS AND CONDITIONS UPDATE
      </div>

      <div className="utility-nav">
        <span>store finder</span>
        <span>help</span>
        <span>orders and returns</span>
        <span>sign up</span>
        <span>log in</span>
      </div>

      <nav className="navbar">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
            alt="Adidas"
          />
        </div>

        <div className="nav-links">
          <a className="sale">END OF SEASON SALE</a>
          <a>SHOES</a>
          <a>MEN</a>
          <a>WOMEN</a>
          <a>KIDS</a>
          <a>SPORTS & LIFESTYLE</a>
        </div>

        <div className="nav-icons">
          <input
            type="text"
            placeholder="Search"
          />

          <div className="icon-wrapper">
            <FaUser />
            <span>1</span>
          </div>

          <FaRegHeart />

          <div className="icon-wrapper">
            <FaShoppingBag />
            <span>0</span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
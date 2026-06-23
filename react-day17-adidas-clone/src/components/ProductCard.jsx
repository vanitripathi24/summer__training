import { FaRegHeart } from "react-icons/fa";

function ProductCard({
  image,
  name,
  price,
}) {
  return (
    <div className="product-card">

      <div className="image-container">

        <FaRegHeart className="heart-icon" />

        <img
          src={image}
          alt={name}
        />

      </div>

      <h3>{name}</h3>

      <h4>{price}</h4>

    </div>
  );
}

export default ProductCard;
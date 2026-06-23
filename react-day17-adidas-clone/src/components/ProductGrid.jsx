import ProductCard from "./ProductCard";
import products from "../data/products";

function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
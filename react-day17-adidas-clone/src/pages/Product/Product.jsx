import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getSingleProduct
} from "../../services/productApi";

function Product() {

  const { product_id } =
    useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    const fetchProduct =
      async () => {

        const data =
          await getSingleProduct(
            product_id
          );

        setProduct(data);
      };

    fetchProduct();

  }, [product_id]);

  if (!product)
    return <h2>Loading...</h2>;

  return (
    <div
      style={{
        padding: "30px"
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        width="400"
      />

      <h1>{product.title}</h1>

      <h2>
        ₹ {product.price}
      </h2>

      <p>
        {product.description}
      </p>

      <p>
        Brand:
        {product.brand}
      </p>

      <p>
        Category:
        {product.category}
      </p>

      <p>
        Rating:
        {product.rating}
      </p>

      <p>
        Stock:
        {product.stock}
      </p>

      <h3>More Images</h3>

      <div>
        {product.images?.map(
          (image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              width="150"
            />
          )
        )}
      </div>

    </div>
  );
}

export default Product;
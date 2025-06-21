import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("❌ Error fetching products:", err));
  }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <div className="product-card" key={product._id}>
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
          />
          <h3>{product.name}</h3>
          <p>Rs. {product.price}</p>
          <Link to={`/product/${product._id}`} className="view-details">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Product;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./pp.css";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="shop-page">
      <h2 className="shop-title">All Products 🛍️</h2>
      <div className="product-grid">
        {products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="product-link"
          >
            <div className="product-card">
              <div className="card-image">
                <img src={product.image} alt={product.name} />
                <div className="price-tag">PKR {product.price}</div>
              </div>
              <div className="card-content">
                <h5>{product.name}</h5>
                <p className="deal-label">{product.description || '🔥 Trending Now'}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;

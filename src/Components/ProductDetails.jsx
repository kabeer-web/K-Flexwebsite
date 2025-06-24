import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Reviews from "./Reviews";
import "./ProductDetails.css";

const DELIVERY_CHARGE = 200;

const ProductDetails = ({ addToCart, addToWishlist, wishlistItems = [] }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Medium");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://kflex-backend.vercel.app/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setIsInWishlist(
          wishlistItems.some((item) => item._id === res.data._id)
        );
      })
      .catch((err) =>
        console.error("❌ Error fetching product:", err?.response?.data || err)
      );
  }, [id, wishlistItems]);

  if (!product) return <div className="loading-shimmer">Loading...</div>;

  const totalPrice = product.price + DELIVERY_CHARGE;

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      addToWishlist({ ...product, selectedSize });
      setIsInWishlist(true);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="product-card-glass">
        <div className="image-side">
          <div className="image-wrapper">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="info-side">
          <div
            className="wishlist"
            onClick={handleAddToWishlist}
            title="Add to Wishlist"
          >
            {isInWishlist ? <FaHeart color="#ff5252" /> : <FaRegHeart />}
          </div>

          <h2>{product.name}</h2>
          <p className="desc">{product.description}</p>

          <div className="size-selector">
            <p>Select Size:</p>
            <div className="size-buttons">
              {["Small", "Medium", "Large"].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pricing">
            <p>Price: Rs. {product.price}</p>
            <p>Delivery: Rs. {DELIVERY_CHARGE}</p>
            <h3>Total: Rs. {totalPrice}</h3>
          </div>

          <div className="action-buttons">
            <button
              className="btn-glass"
              onClick={() => addToCart({ ...product, selectedSize })}
            >
              Add to Cart 🛒
            </button>
            <button
              className="btn-glass wishlist-btn"
              style={{ background: isInWishlist ? "#ff5252" : "#fbc847" }}
              onClick={handleAddToWishlist}
            >
              {isInWishlist ? "Wishlisted ❤️" : "Add to Wishlist 🤍"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Reviews Section */}
      {product._id && (
        <Reviews productId={product._id} productName={product.name} />
      )}
    </div>
  );
};

export default ProductDetails;

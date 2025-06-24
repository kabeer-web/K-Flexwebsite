import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Reviews = ({ productId, productName }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    userName: "",
    comment: "",
    rating: 5,
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "https://kflex-backend.vercel.app";
      const res = await axios.get(`${apiUrl}/api/reviews/product/${productId}`);

      if (Array.isArray(res.data)) {
        setReviews(res.data);
      } else {
        console.error("❌ Reviews is not an array:", res.data);
        setReviews([]);
      }
    } catch (err) {
      toast.error("❌ Failed to fetch reviews");
      console.error("Error fetching reviews:", err);
      setReviews([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "https://kflex-backend.vercel.app";
      await axios.post(`${apiUrl}/api/reviews`, {
        ...newReview,
        productId,
        productName,
      });
      toast.success("✅ Review submitted!");
      setNewReview({ userName: "", comment: "", rating: 5 });
      fetchReviews();
    } catch (err) {
      toast.error("❌ Failed to submit review");
      console.error(err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>⭐ Customer Reviews</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.userName}
          onChange={(e) =>
            setNewReview({ ...newReview, userName: e.target.value })
          }
          required
          style={styles.input}
        />
        <select
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: Number(e.target.value) })
          }
          style={styles.input}
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && "s"}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Write your review..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          required
          style={{ ...styles.input, gridColumn: "span 2", height: "100px" }}
        ></textarea>
        <button type="submit" style={styles.button}>
          Submit Review ✍️
        </button>
      </form>

      {/* Review List */}
      <div
        style={{
          ...styles.reviewList,
          maxHeight: showAll ? "none" : "500px",
          overflowY: showAll ? "visible" : "auto",
        }}
      >
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} style={styles.reviewCard}>
              <div style={styles.userRow}>
                <div style={styles.userIcon}>
                  {review.userName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={styles.userName}>{review.userName}</p>
                  <p style={styles.date}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p style={styles.stars}>⭐ {review.rating} / 5</p>
              <p style={styles.comment}>{review.comment}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No reviews found for this product.
          </p>
        )}
      </div>

      {/* Show More / Less */}
      {Array.isArray(reviews) && reviews.length > 4 && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={styles.toggleButton}
          >
            {showAll ? "Show Less ▲" : "Show More ▼"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;

// Styles
const styles = {
  wrapper: {
    marginTop: "4rem",
    marginBottom: "4rem",
    padding: "2rem",
    borderRadius: "24px",
    background:
      "linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(254, 181, 0, 0.2))",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#feb500",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "2rem",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "12px",
    border: "1px solid #fcd34d",
    background: "white",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    gridColumn: "span 2",
    padding: "0.8rem",
    borderRadius: "12px",
    backgroundColor: "#feb500",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  reviewList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    transition: "max-height 0.4s ease",
  },
  reviewCard: {
    background: "white",
    padding: "1rem",
    borderRadius: "16px",
    border: "1px solid #fef3c7",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    transition: "transform 0.3s",
  },
  userRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.5rem",
  },
  userIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#feb500",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: "1rem",
  },
  userName: {
    fontWeight: "600",
    fontSize: "1rem",
    color: "#111827",
  },
  date: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  stars: {
    color: "#f59e0b",
    fontWeight: "600",
  },
  comment: {
    color: "#374151",
  },
  toggleButton: {
    background: "transparent",
    border: "none",
    color: "#f59e0b",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

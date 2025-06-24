import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './HomePage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHeart, FaStar } from "react-icons/fa";

const HomePage = ({ addToCart, addToWishlist }) => {
  const productsSectionRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Unexpected API response:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleShopNowClick = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      <Container className="mt-5">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content" data-aos="zoom-in">
            <h1 className="hero-title typewriter">K-Flex CLOTHS</h1>
            <p className="hero-text">
              Timeless Fashion, Modern Flair. Explore Our Collection <span className="highlighted-text">👕</span>
            </p>
            <button onClick={handleShopNowClick} className="cta-btn">Shop Now</button>
          </div>
        </div>

        {/* Products Section */}
        <div ref={productsSectionRef}>
          <h3 className="section-title" data-aos="fade-up">🔥 Trending Now</h3>
          <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4 mt-4">
            {Array.isArray(products) && products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <Col key={product._id} className="mb-4" data-aos="fade-up">
                  <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card className="product-card">
                      <div className="card-image">
                        <Card.Img
                          variant="top"
                          src={product.image}
                          alt={`Image of ${product.name}`}
                        />
                        <div className="price-tag">PKR {product.price}</div>
                        <FaHeart className="wishlist-icon" />
                        {product.price < 1000 && (
                          <div className="badge-offer">🔥 Limited Offer</div>
                        )}
                      </div>
                      <Card.Body>
                        <Card.Title className="product-title">{product.name}</Card.Title>
                        <div className="rating-stars">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                        </div>
                        <p className="deal-label">{product.description || '🔥 Trending Now'}</p>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <p className="text-center mt-4 text-muted">No products found or failed to load.</p>
            )}
          </Row>

          {/* Show More Button */}
          <div style={{ textAlign: 'center', marginTop: '30px' }} data-aos="zoom-in">
            <Link to="/Shop/Products">
              <button className="cta-btn">Show More Products →</button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wishlist = ({ wishlistItems, removeFromWishlist, addToCart }) => {
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  const handleProductClick = (product) => {
    addToCart(product); // Call the addToCart function passed from the parent
    navigate('/cart'); // Redirect to the cart page
  };

  return (
    <Container className="mt-5">
      <h1 style={styles.title}>Your Wishlist</h1>
      <Row>
        {wishlistItems.length === 0 ? (
          <Col xs={12}>
            <EmptyWishlistMessage>
              <p>Your wishlist is empty. Start adding some items!</p>
              <Link to="/" style={styles.continueShoppingLink}>Continue Shopping</Link>
            </EmptyWishlistMessage>
          </Col>
        ) : (
          wishlistItems.map((product) => (
            <Col xs={12} md={6} lg={4} key={product.id} className="mb-4">
              <StyledCard>
                <Link to={`/product/${product.id}`} onClick={() => handleProductClick(product)}>
                  <Card.Img variant="top" src={product.image} />
                </Link>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>₹{product.price}</Card.Text>
                  <Button variant="danger" onClick={() => removeFromWishlist(product.id)} style={styles.removeButton}>Remove</Button>
                </Card.Body>
              </StyledCard>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

// Styled components for customized styling
const EmptyWishlistMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
  color: #333;
`;

const StyledCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;

const styles = {
  title: {
    color: "#333",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  continueShoppingLink: {
    display: "inline-block",
    marginTop: "15px",
    fontSize: "1.1rem",
    textDecoration: "none",
    backgroundColor: "#feb500",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  removeButton: {
    width: "100%",
    marginBottom: "10px",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};

export default Wishlist;

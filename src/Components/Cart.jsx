import React, { useState } from 'react';
import axios from "axios";
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Cart = ({ cartItems, removeFromCart, clearCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    emailAddress: '',
    address: '',
    country: ''
  });
  const [message, setMessage] = useState('');
  const shippingFee = 200;
  const total = cartItems.reduce((acc, item) => acc + item.price, 0) + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {
        name: formData.name,
        phone: formData.phoneNumber,
        email: formData.emailAddress,
        address: formData.address,
        country: formData.country,
        products: cartItems,
        totalAmount: total
      });
      setMessage('Order placed successfully');
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
      clearCart();
    } catch (error) {
      console.error("Order placement error:", error);
      setMessage('Error placing order. Please try again.');
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Your Cart - K-Flex | Youth Fashion Pakistan</title>
        <meta name="description" content="Check your cart items at K-Flex. We offer trendy t-shirts for young men, made in Pakistan 🇵🇰." />
        <meta name="keywords" content="K-Flex, cart, youth fashion, made in Pakistan, t-shirts, streetwear, order" />
      </Helmet>

      <Row>
        <Col xs={12} md={8}>
          <h2 className="text-center" style={styles.header}>Your Cart 🛒</h2>
          {cartItems.length > 0 ? (
            <ul className="list-group">
              {cartItems.map(item => (
                <li key={item._id} className="list-group-item cart-item d-flex flex-column flex-md-row align-items-center justify-content-between">
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  <div className="text-center text-md-start">
                    <h5>{item.name}</h5>
                    <p>Rs. {item.price}</p>
                    <p>Size: {item.selectedSize || "N/A"}</p>
                  </div>
                  <div className="mt-2 mt-md-0 d-flex flex-column gap-2">
                    <Button variant="light" className="w-100" onClick={() => removeFromCart(item._id)} style={styles.removeButton}>Remove</Button>
                    <Button variant="dark" className="w-100" onClick={() => setIsModalOpen(true)} style={styles.purchaseButton}>Purchase</Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No items in the cart</p>
          )}
        </Col>

        <Col xs={12} md={4} className="text-center mt-4 mt-md-0">
          <h4 style={styles.orderSummary}>Order Summary</h4>
          <p>Shipping Fee: Rs. {shippingFee}</p>
          <h5>Total: Rs. {total}</h5>
        </Col>
      </Row>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Purchase Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePurchase}>
            {['name', 'phoneNumber', 'emailAddress', 'address', 'country'].map(field => (
              <Form.Group controlId={`form-${field}`} key={field}>
                <Form.Label>{field.replace(/([A-Z])/g, ' $1')}</Form.Label>
                <Form.Control
                  type={field.includes('email') ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                  style={styles.formControl}
                />
              </Form.Group>
            ))}
            <Button variant="dark" type="submit" style={styles.submitButton}>Submit</Button>
          </Form>
          {message && <p style={styles.message}>{message}</p>}
        </Modal.Body>
      </Modal>

      <Modal show={isSuccessModalOpen} onHide={() => setIsSuccessModalOpen(false)} centered>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your order has been placed successfully!</p>
          <p>Thank you for shopping with K-Flex! 🇵🇰</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setIsSuccessModalOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  @media (max-width: 768px) {
    .cart-item img {
      width: 60px !important;
      margin-bottom: 10px;
    }
    .cart-item h5 {
      font-size: 1rem;
    }
    .cart-item p {
      font-size: 0.9rem;
    }
    .cart-item button {
      margin-top: 10px;
    }
  }
`;

const styles = {
  header: {
    color: '#feb500',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
  },
  itemImage: {
    width: '80px',
    marginRight: '20px',
  },
  removeButton: {
    borderColor: '#feb500',
  },
  purchaseButton: {
    backgroundColor: '#feb500',
    color: '#fff',
    borderColor: '#feb500',
  },
  orderSummary: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  modalHeader: {
    backgroundColor: '#feb500',
    color: '#fff',
  },
  formControl: {
    marginBottom: '15px',
    borderRadius: '8px',
  },
  submitButton: {
    backgroundColor: '#feb500',
    color: '#fff',
    borderRadius: '8px',
    width: '100%',
  },
  message: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

export default Cart;

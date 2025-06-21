import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast'; // ✅ FIXED

import NavBar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import MyOrders from './Components/MyOrders';
import ProductDetails from './Components/ProductDetails';
import Wishlist from './Components/Wishlist';
import Reviews from './Components/Reviews';
import Footer from './Components/Footer';
import Product from './Components/Product';
import Shop from './Components/Shop/Products';

const App = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(null);
  const userId = 'sampleUserId'; // Replace with actual user ID later

  useEffect(() => {
    const hasRated = localStorage.getItem(`hasRated_${userId}`);
    if (!hasRated) {
      setShowReview(true);
    }
  }, [userId]);

  const handleRating = (rate) => {
    setRating(rate);
    localStorage.setItem(`hasRated_${userId}`, true);
    setShowReview(false);
  };

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.find((item) => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Helmet>
        <title>K-Flex - Premium T-Shirts for Boys</title>
        <meta name="description" content="Shop K-Flex for high-quality, stylish t-shirts in Plains, Printed, Polo & Custom categories. Exclusive discounts available now!" />
        <meta name="keywords" content="K-Flex, premium t-shirts, printed shirts, plains, polo, custom print, fashion Pakistan" />
        <meta name="author" content="K-Flex PK" />
      </Helmet>

      <div className="app-container">
        <div style={{
          backgroundColor: '#feb500',
          color: '#000',
          padding: '10px 0',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1rem',
          position: 'fixed',
          top: '0',
          width: '100%',
          zIndex: '1000'
        }}>
          🎉 Exclusive Opening Offer: 20% OFF on All T-shirts! Valid from 12 April to 30 June 🎉
        </div>

        <div className="main-content" style={{ paddingTop: '50px' }}>
          <NavBar cartCount={cartItems.length} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <main role="main" className="px-4">
                  <Toaster /> {/* ✅ FIXED */}
                  <Routes>
                    <Route path="/" element={<Home addToWishlist={addToWishlist} addToCart={addToCart} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
                    <Route path="/myorders" element={<MyOrders cartItems={cartItems} />} />
                    <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} addToWishlist={addToWishlist} wishlistItems={wishlistItems} />} />
                    <Route path="/wishlist" element={<Wishlist wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} />} />
                    <Route path="/shop/products" element={<Shop category="shop" addToWishlist={addToWishlist} />} />
                  </Routes>
                </main>
              </div>
            </div>
          </div>
          <Footer />
        </div>

        {showReview && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#fff',
            border: '1px solid #feb500',
            borderRadius: '10px',
            padding: '10px',
            width: '250px',
            zIndex: '9999',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{ fontWeight: 'bold', color: '#feb500' }}>Rate K-Flex</p>
            <p style={{ fontSize: '0.9rem' }}>We'd love your feedback!</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                  <FaStar
                    key={index}
                    size={25}
                    style={{ marginRight: 5, cursor: 'pointer' }}
                    color={starRating <= rating ? '#feb500' : '#e4e5e9'}
                    onClick={() => handleRating(starRating)}
                  />
                );
              })}
            </div>
            <Button variant="primary" style={{ backgroundColor: '#feb500', borderColor: '#feb500' }} onClick={() => setShowReview(false)}>
              Close
            </Button>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;

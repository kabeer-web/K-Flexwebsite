import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown, Form, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaList, FaHeart, FaSearch } from 'react-icons/fa';
import logo from './real.png';
import './NavBar.css';

const NavBar = ({ cartCount }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const handleCartClick = () => {
    navigate(isLoggedIn ? '/cart' : '/signup');
  };

  return (
    <Navbar expand="lg" className={`main-navbar ${isScrolled ? 'sticky-top glassy' : ''}`}>
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img src={logo} height="60" className="d-inline-block align-top logo-img" alt="Kabeer E-com Logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler">
          <FaList />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="align-items-center">
            <Nav.Link as={NavLink} to="/" className="nav-link glow">Home</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="categories-dropdown" className="dropdown-toggle glow">
                Shop
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/Shop/Products">Product</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link as={NavLink} to="/about" className="nav-link glow">About Us</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="nav-link glow">Contact</Nav.Link>
          </Nav>

          <Form className="d-flex search-form">
            <Form.Control
              type="search"
              placeholder="Search for products..."
              className="search-bar"
              aria-label="Search"
            />
            <Button variant="outline-dark" type="submit" className="search-button">
              <FaSearch />
            </Button>
          </Form>

          <Nav className="align-items-center">
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="user-dropdown">
                  {username}
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-dropdown-menu">
                  <Dropdown.Item as={NavLink} to="/myorders" className="user-dropdown-item">
                    <FaList /> My Orders
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/wishlist" className="user-dropdown-item">
                    <FaHeart /> Wishlist
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout} className="user-dropdown-item">
                    <FaUser /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link btn-auth">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link btn-auth">Signup</Nav.Link>
              </>
            )}
            <Nav.Link onClick={handleCartClick} className="cart-icon">
              <FaShoppingCart size={24} />
              <span className="badge bg-warning text-dark cart-badge">{cartCount}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

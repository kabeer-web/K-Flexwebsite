import React from 'react';
import { FaCheckCircle, FaPhoneAlt } from 'react-icons/fa'; // Importing phone and check icons
import logo from './real.png';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Grid Layout */}
        <div style={styles.grid}>
          {/* Logo and Trust */}
          <div style={styles.column}>
            <img src={logo} alt="K-Flex" style={styles.logo} />
            <h5 style={styles.title}>Trusted by</h5>
            <ul style={styles.list}>
              {['Shopify', 'Daraz', 'OLX'].map((platform) => (
                <li key={platform} style={styles.trustedItem}>
                  <FaCheckCircle style={styles.icon} />
                  <span style={styles.text}>{platform}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div style={styles.column}>
            <h5 style={styles.title}>Customer Care</h5>
            {/* Contact Number with Icon and Border */}
            <div style={styles.contactBox}>
              <FaPhoneAlt style={styles.contactIcon} />
              <div style={styles.contactDetails}>
                <p style={styles.contactText}>For any inquiries or problem</p>
                <p style={styles.contactNumber}><strong>03222301920</strong></p>
              </div>
            </div>
            <ul style={styles.list}>
              {['Help Center', 'How to Buy', 'Bulk Purchasing', 'Returns & Refunds', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" style={styles.link}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div style={styles.column}>
            <h5 style={styles.title}>Follow Us</h5>
            <div style={styles.socialContainer}>
              <a href="#" style={styles.social}>Facebook</a>
              <a href="https://www.instagram.com/kflex.pk/" style={styles.social}>Instagram</a>
            </div>
            <p style={styles.dealText}>Exclusive Deals and Offers!</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={styles.bottom}>
          <p>© {new Date().getFullYear()} K-Flex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Styles
const styles = {
  footer: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '40px 20px 20px',
    fontFamily: 'Arial, sans-serif',
    borderTop: '5px solid #feb500', // Yellow border at the top of the footer
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '30px',
    marginBottom: '30px',
  },
  column: {
    padding: '10px',
    borderBottom: '2px solid #feb500', // Yellow border at the bottom of each column
  },
  logo: {
    height: '60px',
    marginBottom: '20px',
  },
  title: {
    color: '#feb500',
    fontSize: '1.1rem',
    marginBottom: '15px',
    fontWeight: '600',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  trustedItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  icon: {
    color: '#4CAF50',
    marginRight: '10px',
  },
  text: {
    fontSize: '0.95rem',
  },
  link: {
    color: '#000',
    textDecoration: 'none',
    fontSize: '0.95rem',
    display: 'block',
    marginBottom: '10px',
    transition: 'color 0.3s',
    padding: '8px 0',
  },
  socialContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '15px',
  },
  social: {
    backgroundColor: '#feb500',
    color: '#000',
    padding: '8px 16px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s',
  },
  dealText: {
    color: '#feb500',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  bottom: {
    textAlign: 'center',
    borderTop: '1px solid #feb500', // Yellow border at the bottom of the footer
    paddingTop: '20px',
    fontSize: '0.85rem',
    color: '#555',
  },

  // New styles for Contact Number Box
  contactBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #feb500',
    marginBottom: '20px',
    marginTop: '15px',
  },
  contactIcon: {
    color: '#feb500',
    fontSize: '1.5rem',
    marginRight: '15px',
  },
  contactDetails: {
    flex: '1',
  },
  contactText: {
    color: '#000',
    fontSize: '0.95rem',
  },
  contactNumber: {
    color: '#feb500',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
};

export default Footer;

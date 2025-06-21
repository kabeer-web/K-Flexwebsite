import React, { useState, useContext } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
} from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Modal, Button, Spinner } from 'react-bootstrap';
import logo from './real.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      login(userCredential.user);
      setShowModal(true);
    } catch (error) {
      setError(error.message || 'Error creating account');
      console.error('SignUp error:', error);
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      login(result.user);
      setShowModal(true);
    } catch (error) {
      setError(error.message || 'Google Sign-Up failed');
      console.error('Google Sign-Up error:', error);
    }
    setLoading(false);
  };

  const handleReload = () => {
    setShowModal(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>Join Us</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-3" style={styles.inputContainer}>
            <label htmlFor="email" className="form-label" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              style={styles.input}
            />
          </div>
          <div className="mb-3" style={styles.inputContainer}>
            <label htmlFor="password" className="form-label" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              style={styles.input}
            />
          </div>
          {error && <div className="alert alert-danger" style={styles.errorMessage}>{error}</div>}
          <button
            type="submit"
            className="btn"
            style={styles.button}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
          </button>
        </form>
        <Button
          className="btn btn-light mt-3"
          style={styles.googleButton}
          onClick={handleGoogleSignUp}
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up with Google'}
        </Button>
        <div className="text-center mt-3">
          <p style={styles.linkText}>Already have an account? <Link to="/login" style={styles.link}>Login here</Link></p>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} style={styles.modal}>
        <div style={styles.modalContent}>
          <Modal.Header style={styles.modalHeader}>
            <Modal.Title style={styles.modalTitle}>Account Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={logo} alt="Logo" style={styles.modalLogo} />
            <p style={styles.modalText}>Your account has been successfully created. Please reload the page.</p>
          </Modal.Body>
          <Modal.Footer style={styles.modalFooter}>
            <Button variant="light" onClick={() => setShowModal(false)} style={styles.closeButton}>
              Close
            </Button>
            <Button variant="dark" onClick={handleReload} style={styles.reloadButton}>
              Reload Page
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    maxWidth: '400px',
    width: '100%',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  logo: {
    width: '100px',
    marginBottom: '20px',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '5px',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderRadius: '8px',
    padding: '10px',
    width: '100%',
    outline: 'none',
  },
  button: {
    backgroundColor: '#feb500',
    color: '#fff',
    borderColor: '#feb500',
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: '#ccc',
    width: '100%',
    borderRadius: '8px',
    padding: '10px',
  },
  errorMessage: {
    backgroundColor: '#fce4e4',
    color: '#d9534f',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
  },
  linkText: {
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#333',
    textDecoration: 'underline',
    fontWeight: '600',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    padding: '20px',
  },
  modalHeader: {
    borderBottom: 'none',
  },
  modalTitle: {
    color: '#000',
    fontWeight: '600',
  },
  modalLogo: {
    width: '80px',
    marginBottom: '15px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalText: {
    color: '#000',
    textAlign: 'center',
  },
  modalFooter: {
    borderTop: 'none',
    display: 'flex',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: '#fff',
    borderColor: '#feb500',
    color: '#feb500',
    borderRadius: '8px',
    padding: '10px 20px',
    fontWeight: '600',
    transition: '0.3s',
  },
  reloadButton: {
    backgroundColor: '#feb500',
    borderColor: '#feb500',
    color: '#fff',
    borderRadius: '8px',
    padding: '10px 20px',
    fontWeight: '600',
    transition: '0.3s',
  },
};

export default SignUp;

import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

const ContactForm = () => {
  const form = useRef();
  const [showModal, setShowModal] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_t3tj2bi",
        "template_ql58ig6",
        form.current,
        "L_nT0Z0Vqx-XM1a3J"
      )
      .then(
        (result) => {
          console.log(result.text);
          setShowModal(true);
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message.");
        }
      );
    e.target.reset();
  };

  return (
    <>
      <section style={styles.container} aria-label="Contact Section">
        <div style={styles.card}>
          <h1 style={styles.title}>Contact Us</h1>
          <form ref={form} onSubmit={sendEmail} aria-label="Contact Form">
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FontAwesomeIcon icon={faUser} /> Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                style={styles.input}
                placeholder="Your Name"
                aria-label="Name"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                style={styles.input}
                placeholder="you@example.com"
                aria-label="Email"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FontAwesomeIcon icon={faPhone} /> Phone
              </label>
              <input
                type="text"
                name="user_phone"
                style={styles.input}
                placeholder="Phone Number"
                aria-label="Phone"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FontAwesomeIcon icon={faCommentDots} /> Message
              </label>
              <textarea
                name="message"
                rows="4"
                required
                style={styles.textarea}
                placeholder="Your message..."
                aria-label="Message"
              ></textarea>
            </div>
            <button type="submit" style={styles.button}>
              Send Message
            </button>
          </form>
        </div>
      </section>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 style={styles.modalTitle}>Message Sent</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Your message was sent successfully. We will get back to you soon!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => setShowModal(false)}
                  style={styles.closeButton}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Responsive styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  },
  title: {
    color: "#feb500",
    fontWeight: "800",
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: "0.95rem",
    marginBottom: "0.3rem",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #feb500",
    backgroundColor: "#f0f0f0",
    fontSize: "0.95rem",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #feb500",
    backgroundColor: "#f0f0f0",
    fontSize: "0.95rem",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    backgroundColor: "#feb500",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    border: "none",
    marginTop: "1rem",
  },
  modalTitle: {
    color: "#28a745",
  },
  closeButton: {
    borderRadius: "10px",
  },
};

export default ContactForm;

import React from 'react';
import { Container, Row, Col, Badge, Image } from 'react-bootstrap';
import './AboutUs.css';
import myImage from './images/kabeer.jpg';

const About = () => {
  return (
    <Container className="about-container">
      <header>
        <h1>
          🌟 About K-Flex & Me 🌟
          <Badge className="ml-2" bg="success">
            Proudly Made in Pakistan 🇵🇰
          </Badge>
        </h1>
      </header>

      <Row className="justify-content-center">
        <Col md={6} lg={4} className="text-center">
          <Image
            src={myImage}
            alt="Kabeer - Founder of K-Flex"
            roundedCircle
            className="profile-img"
          />
          <h2 className="mt-3">Hi, I'm Kabeer!</h2>
          <p className="intro-text">
            I'm the creator of <strong>K-Flex</strong>, a passionate web developer specializing in the MERN stack. I design sleek, functional websites with a modern touch.
          </p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
          <h2>About K-Flex</h2>
          <p>
            <strong>K-Flex</strong> offers trendy, comfortable, and affordable t-shirts for young men. We blend modern aesthetics with comfort to inspire confidence and style in every look.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;

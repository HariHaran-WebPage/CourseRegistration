import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4 footer">
      <Container fluid className="py-3">
        <Row>
          <Col md={4} className="text-center text-md-left">
            <h5>About Us</h5>
            <p>
              We offer a variety of online courses to help you learn new skills
              and advance your career.
            </p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Contact Us</h5>
            <p>Email: support@coursecatalog.com</p>
            <p>Phone: 123-456-7890</p>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Follow Us</h5>
            <a href="#" className="text-white mr-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white mr-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

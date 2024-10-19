import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faSearch} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Row,Col ,Container} from "react-bootstrap";

export default function Footer(){


    return(
        <>

              
      <footer className="footer text-center py-4">
        <Container>
          <Row>
            <Col md={6} className="bg-org">
              <p>© 2024 Home Food. All rights reserved.</p>
              <Link className="bg-org" to="/contact">Contact Us</Link> | <Link className="bg-org" to="/privacy">Privacy Policy</Link>
            </Col>
            <Col md={6} className="social-icons">
              <a href="https://www.facebook.com" className="me-3">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://www.instagram.com" className="me-3">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://www.twitter.com" className="me-3">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </Col>
          </Row>
        </Container>
      </footer>

        </>
    )
}
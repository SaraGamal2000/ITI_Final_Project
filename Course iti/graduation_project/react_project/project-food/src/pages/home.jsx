import React from "react";
import { Container, Row, Col, Card, Button,Form } from "react-bootstrap";
import Nav from "../component/navbar/nav";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import img1bg from "../assest/img1bg.avif"; 
import img2bg from "../assest/img2bg.webp"

import "./home.css"; 

function Home_p(){
    const featuredchef= [
        { id: 1, title: "chef1", description: "Description of chef 1", img: img1bg },
        { id: 2, title: "chef 2", description: "Description of chef 2", img: img2bg },
        { id: 3, title: "chef 3", description: "Description of chef 3", img: img1bg  },
        { id: 4, title: "chef4", description: "Description of chef 4", img: img1bg },
      ];
    return(
        
            
            <div>
      
<div className="hero text-white py-5" style={{ backgroundColor: '#f8f9fa' }}>
  <Container>
    {/* <Row className="align-items-center"> */}
      <div 
      style={{
      backgroundColor: "rgba(255, 255, 255, 0.7)",  
      padding: "10px",                              
      borderRadius: "10px",                       
      backdropFilter: "blur(1px)",                 
    }}>
      <Col md={6} className="text-start">
        <h1>
          Explore <span>Home</span> Cooked <span>Food </span> & Sweets
        </h1>
        <p>Discover the best homemade dishes in your city</p>
        <Button variant="warning" className="bg-orange" href="#search-section">
          Start Your Search
        </Button>
      </Col>
      </div>
      
      
    {/* </Row> */}
  </Container>
</div>

      <div className="search-section py-4" id="search-section">
        <Container>
          <h2 className="text-center mb-4">Find Local Home Chefs</h2>
          <Row className="justify-content-center">
            <Col className="d-flex">
              <Form.Control
                as="select"
                className="w-50 me-2"
                defaultValue="Select Country"
              >
                <option>Select Country</option>
                <option>Cairo</option>
                <option>Giza</option>
                <option>Alexandria</option>
                

              </Form.Control>
              <Form.Control as="select" className="w-50 me-2" defaultValue="Select Category">
                <option>Select Category</option>
                <option>Home-cooked Meals</option>
                <option>Home-Made-Sweets</option>
              </Form.Control>
              <Button variant=" bg-orange" className="search-button btn btn-outline-warning ">
                <FontAwesomeIcon  icon={faSearch} />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

     
      <Container className="my-5 ">
        <h2 className="text-center mb-4">Featured chefs</h2>
        <Row>
          {featuredchef.map((chef) => (
            <Col md={3} key={chef.id} className="mb-4">
              <Card className="m-3 shadow">
                <Card.Img variant="top" src={chef.img} className="" />
                <Card.Body>
                  <Card.Title>{chef.title}</Card.Title>
                  <Card.Text>{chef.description}</Card.Text>
                  <Button variant="primary bg-orange btn btn-outline-warning" href={`/chefs/${chef.id}`}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      
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
    </div>

    )

}
export default Home_p;
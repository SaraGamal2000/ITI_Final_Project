import React from "react";
import { Container, Row, Col, Card, Button,Form } from "react-bootstrap";
import Nav from "../component/navbar/nav";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import img1bg from "../assest/img1bg.avif"; 
import img2bg from "../assest/img2bg.webp";
import img4bg from "../assest/img4bg.jpg";

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
      
<div className="hero text-white py-5 " style={{ backgroundColor: '#fff3e0' }}>
  <div className="bg-img rounded-circle bg-white">
     {/* <div className="img rounded-circle w-25 h-50 "></div> */}
     <img src={img4bg} className="imgbg rounded-circle  m-5"  />
  </div>
  <Container className="textcard">
    {/* <Row className="align-items-center"> */}
      <div 
      style={{
      backgroundColor: "rgba(255, 255, 255, 0.7)",  
      padding: "10px",                              
      borderRadius: "10px",                       
      backdropFilter: "blur(1px)", 
      width:"800px"   ,
      height:"500px"             
    }}>
      <Col md={6} className="text-center text-warning m-5">
        <h1 className="text-warning  m-4">
          Explore <span className="m-1"> Home </span> Cooked <span className="m-1 ">Food</span> & Sweets
        </h1>
        <p style={{color:"orange", fontSize:"20px" ,fontWeight:"bolder"}}>Discover the best homemade dishes in your city</p>
        <Button variant="warning" className="bg-orange m-5 w-75 fs-3" href="#search-section">
          Start Your Search
        </Button>
      </Col>
      </div>
      
      
    {/* </Row> */}
  </Container >
</div>

      <div className="search-section py-4" id="search-section">
        <Container>
          <h2 className="text-center mb-4 fs-1">Find Local Home Chefs</h2>
          <Row className="justify-content-center">
            <Col className="d-flex">
              <Form.Control
                as="select"
                className="w-50 me-2 rounded-5 border-2 w-75"
                defaultValue="Select Country"
                style={{marginLeft:"100px"}}
              >
                <option>Select Country</option>
                <option>Cairo</option>
                <option>Giza</option>
                <option>Alexandria</option>
                

              </Form.Control>
              
              <Button variant=" bg-orange" className="search-button btn btn-outline-warning rounded-4 ">
                <FontAwesomeIcon  icon={faSearch} />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

     
      <Container className="my-5 ">
        {/* <h2 className="text-center mb-4">Featured chefs</h2> */}
        <Row>
          {featuredchef.map((chef) => (
            <Col md={3} key={chef.id} className="mb-4">
              <Card className="m-3 shadow bg-light">
                <Card.Img variant="top" src={chef.img} className="p-3 rounded-5" />
                <Card.Body>
                  <Card.Title className="text-dark fs-4">{chef.title}</Card.Title>
                  <Card.Text>{chef.description}</Card.Text>
                  <div className="mt-auto">
                  <Button variant="outline-warning"
                    className="rounded-5 m-1 w-100  text-dark fs-6" href={`/chefs/${chef.id}`}>
                    View Details
                  </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

{/*       
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
      </footer> */}
    </div>

    )

}
export default Home_p;
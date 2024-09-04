import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import '../App.css';
import { Col, Row } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-4">
      <div className="container p-4">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">About EaseResume</h5>
            <hr style={{borderTop: '2px solid black'}}></hr>
            <p>
            A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <hr style={{borderTop: '2px solid black'}}></hr>
            <Row>
                <Col>
                    <ul className="list-unstyled mb-0">
                        <li><a href="/" className="text-dark">Home</a></li>
                        <li><a href="/about" className="text-dark">Resume</a></li>
                    </ul>
                </Col>
                <Col>
                    <ul className="list-unstyled mb-0">
                        <li><a href="/services" className="text-dark">About</a></li>
                        <li><a href="/contact" className="text-dark">Contact</a></li>
                    </ul>
                </Col>
            </Row>
           
            
          </div>

          {/* Social Media Section */}
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Me</h5>
            <hr style={{borderTop: '2px solid black'}}></hr>
            <a href="https://facebook.com" className="text-dark me-3">
                <BsFacebook className="social-icon" />
            </a>
            <a href="https://twitter.com" className="text-dark me-3">
                <BsInstagram className="social-icon" />
            </a>
            <a href="https://instagram.com" className="text-dark me-3">
                <BsGithub className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{borderTop : '1px solid black'}}>
        © 2024 EaseResume | All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Carousel } from 'react-bootstrap';
import "../App.css";

import resumeImage1 from '../assets/resume-sample.png';
import resumeImage2 from '../assets/resume-sample.png';
import resumeImage3 from '../assets/resume-sample.png';
import resumeImage4 from '../assets/resume-sample.png';
import resumeImage5 from '../assets/resume-sample.png';
import resumeImage6 from '../assets/resume-sample.png';

function TemplatesSection() {
  const resumeItems = [
    { imageUrl: resumeImage1, link: 'https://example.com/resume1' },
    { imageUrl: resumeImage2, link: 'https://example.com/resume2' },
    { imageUrl: resumeImage3, link: 'https://example.com/resume3' },
    { imageUrl: resumeImage4, link: 'https://example.com/resume4' },
    { imageUrl: resumeImage5, link: 'https://example.com/resume5' },
    { imageUrl: resumeImage6, link: 'https://example.com/resume6' },
  ];

  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(3);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);

    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  // Split the items into groups based on itemsPerSlide
  const groupedResumeItems = [];
  for (let i = 0; i < resumeItems.length; i += itemsPerSlide) {
    groupedResumeItems.push(resumeItems.slice(i, i + itemsPerSlide));
  }

  return (
    <Container fluid className='mt-5 pt-4 templatesSection'>
      <Row className="justify-content-md-center text-center templatesRow mb-4 mt-3">
        <Col xs={12}>
          <h2>Our Templates</h2>
          <h4>What are the features of EaseResume?</h4>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12}>
          <Carousel
            className="custom-carousel"
            indicators={false} // Hide default indicators
          >
            {groupedResumeItems.map((group, groupIndex) => (
              <Carousel.Item key={groupIndex}>
                <Row>
                  {group.map((item, index) => (
                    <Col key={index} xs={12} md={4} className="d-flex justify-content-center">
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <img
                          className="d-block carousel-image"
                          src={item.imageUrl}
                          alt={`Resume ${index + 1}`}
                        />
                      </a>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default TemplatesSection;
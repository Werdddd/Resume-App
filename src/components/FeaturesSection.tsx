import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import "../App.css";
import icon1 from "../assets/featureIcon.png"; // Replace with your image paths
import icon2 from "../assets/featureIcon (3).png"; // Replace with your image paths
import icon3 from "../assets/featureIcon (2).png"; // Replace with your image paths
import icon4 from "../assets/featureIcon (4).png"; // Replace with your image paths

function FeaturesSection() {
  return (
    <Container className='mt-5 featuresSection'>
      <Row className="justify-content-md-center text-center featuresRow mb-4">
        <Col xs={12}>
          <h2>Our Features</h2>
          <h4>What are the features of EaseResume?</h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card style={{ width: '100%' }}>
            <Card.Body className="text-center">
              <img src={icon1} alt="Powerful resume builder" className="card-icon mb-3" />
              <Card.Title>Powerful resume builder</Card.Title>
              <Card.Text>
                Easily input your details and get professional results.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card style={{ width: '100%' }}>
            <Card.Body className="text-center">
              <img src={icon2} alt="Custom Templates" className="card-icon mb-3" />
              <Card.Title>Professional Templates</Card.Title>
              <Card.Text>
                Choose from a variety of professional templates.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card style={{ width: '100%' }}>
            <Card.Body className="text-center">
              <img src={icon3} alt="Easy Export" className="card-icon mb-3" />
              <Card.Title>Customization made simple</Card.Title>
              <Card.Text>
                Fine-tune your resume for a specific job with ease.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card style={{ width: '100%' }}>
            <Card.Body className="text-center">
              <img src={icon4} alt="Real-Time Preview" className="card-icon mb-3" />
              <Card.Title>AI-Powered Suggestions</Card.Title>
              <Card.Text>
                Get personalized recommendations to enhance your resume.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
      <Row className="justify-content-center text-center">
      <a className='getStartedButton'>Get Started</a> 
      </Row>
    </Container>
  );
}

export default FeaturesSection;

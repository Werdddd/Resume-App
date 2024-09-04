import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import "../App.css";
import icon1 from "../assets/stepIcon.png"; // Replace with your image paths
import icon2 from "../assets/stepIcon (2).png"; // Replace with your image paths
import icon3 from "../assets/stepIcon (3).png"; // Replace with your image paths
import icon4 from "../assets/stepIcon (4).png"; // Replace with your image paths

function StepsSection() {
  return (
    <Container className='mt-5 featuresSection'>
      <Row className="justify-content-md-center text-center featuresRow mb-4">
        <Col xs={12}>
          <h2>How does it work?</h2>
          <h4>What are the features of EaseResume?</h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card style={{ width: '100%' }}>
            <Card.Body className="text-center">
              <img src={icon1} alt="Powerful resume builder" className="card-icon mb-3" />
              <Card.Title>Step 1</Card.Title>
              <Card.Text>
                Sign Up and Log In
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card style={{ width: '100%' }}>
            <Card.Body className="text-center">
              <img src={icon2} alt="Custom Templates" className="card-icon mb-3" />
              <Card.Title>Step 2</Card.Title>
              <Card.Text>
                Enter Your Details
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card style={{ width: '100%' }}>
            <Card.Body className="text-center">
              <img src={icon3} alt="Easy Export" className="card-icon mb-3" />
              <Card.Title>Step 3</Card.Title>
              <Card.Text>
                Choose a Template
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card style={{ width: '100%' }}>
            <Card.Body className="text-center">
              <img src={icon4} alt="Real-Time Preview" className="card-icon mb-3" />
              <Card.Title>Step 4</Card.Title>
              <Card.Text>
                Download Your Resume
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StepsSection;


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import "../App.css"
import resumeSample from "../assets/resume-header1.png";

function ContainerFluid() {
  return (
    <Container fluid className='containerFluid'>
      <Row className="justify-content-md-center text-center text-md-start headRow">
      <Col lg={5} md={6} sm={12} className="d-flex align-items-center">
          <div className='textHeader mt-5'>
            <h6>The Ultimate Resume Builder for the Warriors</h6>
            <h1>Your future starts with a resume.</h1>
            <h6>Ready to Create a Standout Resume with Ease?</h6>
            <a className='getStartedButton'>Get Started</a>
          </div>
        </Col>
        <Col lg={5} md={6} sm={12} className="d-flex justify-content-center align-items-center mt-4">
        <img src={resumeSample} alt="Sample" style={{
          width: '100%',
          height: 'auto', 
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
          }} />
        </Col>
      </Row>
      {/* <div className='mt-3'>
        <Row className="justify-content-md-center text-center featuresRow mb-4">
          <Col xs={12}>
            <h2>Our Features</h2>
            <h4>What are the features of EaseResume?</h4>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>Powerful resume builder</Card.Title>
                <Card.Text>
                  Easily input your details and get professional results.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>Professional templates</Card.Title>
                <Card.Text>
                  Choose from a variety of professional templates.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>Customization made simple</Card.Title>
                <Card.Text>
                  Fine-tune your resume for a specific job with ease.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={6} xs={12} className="d-flex mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>AI-Powered Suggestions</Card.Title>
                <Card.Text>
                  Get personalized recommendations to enhance your resume.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div> */}
    </Container>
  );
}

export default ContainerFluid;
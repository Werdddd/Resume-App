
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../App.css"
import resumeSample from "../assets/resume-header1.png";
import { Link } from 'react-router-dom';

function ContainerFluid() {
  return (
    <Container fluid className='containerFluid'>
      <Row className="justify-content-md-center text-center text-md-start headRow">
      <Col lg={5} md={6} sm={12} className="d-flex align-items-center">
          <div className='textHeader mt-5'>
            <h6>The Ultimate Resume Builder for the Warriors</h6>
            <h1>Your future starts with a resume.</h1>
            <h6>Ready to Create a Standout Resume with Ease?</h6>
            <Link to="/dashboard" className="getStartedButton">
              Get Started
            </Link>
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
      
    </Container>
  );
}

export default ContainerFluid;
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../App.css"
import resumeSample from "../assets/resume-header1.png";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

// Typing effect component for animated words
interface TypingEffectProps {
  words: string[];
  speed?: number;
  pause?: number;
}

function TypingEffect({ words, speed = 120, pause = 1200 }: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
      let timeout: ReturnType<typeof setTimeout>;
      const currentWord = words[wordIndex];

      if (!deleting && charIndex <= currentWord.length) {
          timeout = setTimeout(() => {
              setDisplayed(currentWord.slice(0, charIndex));
              setCharIndex(charIndex + 1);
          }, speed);
      } else if (deleting && charIndex >= 0) {
          timeout = setTimeout(() => {
              setDisplayed(currentWord.slice(0, charIndex));
              setCharIndex(charIndex - 1);
          }, speed / 2);
      } else if (!deleting && charIndex > currentWord.length) {
          timeout = setTimeout(() => setDeleting(true), pause);
      } else if (deleting && charIndex < 0) {
          setDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
          setCharIndex(0);
      }
      return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return <span className="typing-effect">{displayed}<span className="typing-cursor">|</span></span>;
}

function ContainerFluid() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <Container fluid className='containerFluid'>
      <Row className="justify-content-md-center text-center text-md-start headRow">
      <Col lg={5} md={6} sm={12} className="d-flex align-items-center">
          <div className='textHeader mt-5'>
            <h6>Designed for dreamers, doers, and go-getters.</h6>
            <h1 style={{color: '#06402B'}} className="h1  mb-3">
                Your{' '}
                <TypingEffect words={["future", "career", "journey"]} /> starts with a resume.
            </h1>
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
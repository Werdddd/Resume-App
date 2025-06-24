import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Footer from '../components/Footer';
import { useAuth } from '../App';
import '../App.css';

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

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Use auth context to login
                login(data.token, data.user);
                
                // Redirect to dashboard
                navigate('/dashboard', { replace: true });
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Container fluid className="loginPage">
            <Row className="justify-content-center align-items-center" >
                {/* Left Column - Greeting */}
                <Col sm={12} md={6} lg={6} className="d-flex align-items-center justify-content-center">
                    <div className="auth-content-wrapper w-100" >
                        <div className="text-center text-md-start">
                            <h1 className="display-4 fw-bold text-primary mb-4">Welcome!</h1>
                            <h2 className="h3 text-dark mb-3">
                                Ready to build your{' '}
                                <TypingEffect words={["personal", "creative", "professional"]} /> resume?
                            </h2>
                            <p className="lead text-muted mb-4">
                                EaseResume helps you create stunning, professional resumes in minutes. 
                                Join thousands of users who have landed their dream jobs with our easy-to-use resume builder.
                            </p>
                            <Row className="d-flex flex-column flex-sm-row">
                                <Col sm={4} md={4} lg={4} className="text-center">
                                    <div className="h4 text-success mb-2">📝</div>
                                    <p className="small text-muted">Easy to use templates</p>
                                </Col>
                                <Col sm={4} md={4} lg={4}  className="text-center">
                                    <div className="h4 text-primary mb-2">⚡</div>
                                    <p className="small text-muted">Quick and efficient</p>
                                </Col>
                                <Col sm={4} md={4} lg={4}  className="text-center">
                                    <div className="h4 text-info mb-2">🎯</div>
                                    <p className="small text-muted">Professional results</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>

                {/* Right Column - Login Card */}
                <Col sm={12} md={6} lg={6} className="d-flex align-items-center justify-content-center">
                    <div className="auth-content-wrapper w-100">
                        <div className="loginCard p-5">
                            <div className="text-center mb-4">
                                <h2>Login</h2>
                                <p className="text-muted">Welcome back! Please login to your account.</p>
                            </div>

                            {error && (
                                <Alert variant="danger" onClose={() => setError('')} dismissible>
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 mb-3 mt-3"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>

                                <div className="text-center">
                                    <p className="mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/signup" className="text-decoration-none">
                                            Sign up here
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        <Footer />
        </>
    );
}

export default Login; 
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

function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
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
                setError(data.error || 'Signup failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Container fluid className="signupPage">
            <Row className="justify-content-center align-items-center min-vh-100">
                {/* Left Column - Signup Card (order-2 on mobile, order-1 on md+) */}
                <Col sm={12} md={6} lg={6} className="d-flex align-items-center justify-content-center order-2 order-md-1">
                    <div className="auth-content-wrapper w-100">
                        <div className="signupCard p-4">
                            <div className="text-center mb-4">
                                <h2>Sign Up</h2>
                                <p className="text-muted">Create your account to get started.</p>
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

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password (min 6 characters)"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 mb-3 mt-3"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating account...' : 'Sign Up'}
                                </Button>

                                <div className="text-center">
                                    <p className="mb-0">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-decoration-none">
                                            Login here
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>

                {/* Right Column - Greeting (order-1 on mobile, order-2 on md+) */}
                <Col sm={12} md={6} lg={6} className="d-flex align-items-center justify-content-center order-1 order-md-2">
                    <div className="auth-content-wrapper w-100">
                        <div className="text-center text-md-start">
                            <h1 className="display-4 fw-bold text-primary mb-4">Join EaseResume!</h1>
                            <h2 className="h3 text-dark mb-3">
                            Start building your{' '}
                                <TypingEffect words={["career", "future", "dreams"]} /> today?
                            </h2>
                            <p className="lead text-muted mb-4">
                                Create professional resumes that stand out from the crowd. 
                                Our intuitive builder makes it easy to showcase your skills and experience.
                            </p>
                            <div className="d-flex flex-column flex-md-row gap-3">
                                <div className="text-center">
                                    <div className="h4 text-success mb-2">🚀</div>
                                    <p className="small text-muted">Get started in minutes</p>
                                </div>
                                <div className="text-center">
                                    <div className="h4 text-primary mb-2">💼</div>
                                    <p className="small text-muted">Professional templates</p>
                                </div>
                                <div className="text-center">
                                    <div className="h4 text-info mb-2">📊</div>
                                    <p className="small text-muted">Track your progress</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        <Footer />
        </>
    );
}

export default Signup; 
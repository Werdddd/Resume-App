import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { FaStar } from "react-icons/fa";
import { BsQuote } from "react-icons/bs";
import "../App.css";

function FeedbackSection() {
  return (
    <Container fluid className="mt-5 feedbackSection">
      <Row className="justify-content-md-center text-center feedbackRow pt-3 mb-4">
        <Col xs={12}>
          <h2>Testimonials</h2>
          <h4>
            Loved by the students. Reviewed by the community. Trusted by
            professionals.
          </h4>
        </Col>
      </Row>
      <Row className="justify-content-center feedbacks">
        <Col lg={4} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card className="testimonial-card">
            <Card.Body>
              <Card.Text className="testimonial-text text-justify">
                <BsQuote className="quote-icon" />
                EaseResume made creating my resume so simple! The AI suggestions
                helped me highlight my skills in a way I never thought possible.
                I felt confident submitting my resume for my internship
                application, and I got the position I wanted!”
              </Card.Text>
              <Row className="align-items-center" style={{ width: "100%" }}>
                <Col className="text-left">
                  <Card.Text className="testimonial-author">
                    Z. Lanticse
                  </Card.Text>
                </Col>
                <Col className="text-end">
                  <Card.Text className="testimonial-stars">
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card className="testimonial-card">
            <Card.Body>
              <Card.Text className="testimonial-text text-justify">
                <BsQuote className="quote-icon" />I was struggling with how to
                format my resume, but EaseResume provided professional templates
                that took the guesswork out of the process. The whole experience
                was seamless, and my resume now looks polished and ready for the
                job market!”
              </Card.Text>
              <Row className="align-items-center" style={{ width: "100%" }}>
                <Col className="text-left">
                  <Card.Text className="testimonial-author">
                    J. Guiriba
                  </Card.Text>
                </Col>
                <Col className="text-end">
                  <Card.Text className="testimonial-stars">
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={4} sm={6} xs={12} className="d-flex mb-4">
          <Card className="testimonial-card">
            <Card.Body>
              <Card.Text className="testimonial-text text-justify">
                <BsQuote className="quote-icon" />
                As a Warrior student, finding a resume
                builder tailored to my needs was a game-changer. EaseResume is
                incredibly user-friendly, and the ATS optimization feature
                ensured that my resume stood out to potential employers. Highly
                recommend!”
              </Card.Text>
              <Row className="align-items-center" style={{ width: "100%" }}>
                <Col className="text-left">
                  <Card.Text className="testimonial-author">
                    K. Francisco
                  </Card.Text>
                </Col>
                <Col className="text-end">
                  <Card.Text className="testimonial-stars">
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                    <FaStar className="text-warning" />{" "}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FeedbackSection;

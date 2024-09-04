import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import "../App.css";

function FAQSection() {
  return (
    <Container fluid className="faqSection">
      <Row className="justify-content-md-center text-center text-md-start headRow">
        <Col lg={5} md={5} sm={12} className="align-items-center">
          <div className="faqtextHeader">
            <h1>Frequently Asked Questions</h1>
            <h6>
              <i>Got some concerns and inquiries?</i>
            </h6>
          </div>
        </Col>
        <Col
          lg={5}
          md={5}
          sm={12}
          className="justify-content-center align-items-center"
        >
          <Accordion defaultActiveKey="0" className="custom-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Who are you, and why did you build EaseResume?
              </Accordion.Header>
              <Accordion.Body className="text-justify">
                I’m Andrew Emmanuel Robles, a 3rd-year Computer Science student
                at the University of the East - Caloocan. As I entered my Junior
                year, I realized the importance of having a strong, professional
                resume for internship and job applications. With less than two
                years until graduation, I wanted to be fully prepared. That’s
                why I created EaseResume—to help students like myself who might
                feel anxious about their internship applications and are unsure
                how to craft a compelling resume. While I initially built it for
                UE Caloocan students, my hope is that EaseResume will eventually
                reach a broader audience, providing more students with the tools
                they need to kickstart their careers.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                What makes EaseResume the best resume tool?
              </Accordion.Header>
              <Accordion.Body className="text-justify">
                EaseResume is built by a student, for students. It’s completely
                free, making it accessible to everyone. As someone who
                understands the challenges students face, I’ve designed
                EaseResume to be simple, effective, and tailored to the specific
                needs of students preparing for internships and job
                applications.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How can I use EaseResume?</Accordion.Header>
              <Accordion.Body className="text-justify">
                Using EaseResume is simple! Start by using your UE Gmail account, then
                input your personal details, education, work experiences, and
                skills. Our AI will help you choose the right words and format
                to present your experiences effectively. You can choose from
                various professional templates, customize them to your liking,
                and download your resume in PDF format.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What is an AI Resume Builder?</Accordion.Header>
              <Accordion.Body className="text-justify">
                An AI Resume Builder is a tool that leverages artificial
                intelligence to help you create a resume. It provides
                suggestions on wording, format, and content to ensure your
                resume is tailored to your industry and highlights your
                strengths. EaseResume’s AI analyzes your input and suggests
                improvements based on what employers in your field are looking
                for, giving you a competitive edge in the job market.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default FAQSection;

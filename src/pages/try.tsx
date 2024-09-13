// App.js

import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button, Modal } from 'react-bootstrap';
import "../App.css"

function CreateResume() {
    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showCertificationModal, setShowCertificationModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);

    const handleCloseExperience = () => setShowExperienceModal(false);
    const handleShowExperience = () => setShowExperienceModal(true);
    
    const handleCloseEducation = () => setShowEducationModal(false);
    const handleShowEducation = () => setShowEducationModal(true);

    const handleCloseSkill = () => setShowSkillModal(false);
    const handleShowSkill = () => setShowSkillModal(true);

    const handleCloseCertification = () => setShowCertificationModal(false);
    const handleShowCertification = () => setShowCertificationModal(true);

    const handleCloseProject = () => setShowProjectModal(false);
    const handleShowProject = () => setShowProjectModal(true);

    const handleSubmitExperience = (event) => {
        event.preventDefault();
        // Handle form submission logic here

        // Close the modal after submission
        handleCloseExperience();
    };

    const handleSubmitEducation = (event) => {
        event.preventDefault();
        // Handle form submission logic here

        // Close the modal after submission
        handleCloseEducation();
    };

    const handleSubmitSkill = (event) => {
        event.preventDefault();
        // Handle form submission logic here

        // Close the modal after submission
        handleCloseSkill();
    };

    const handleSubmitCertification = (event) => {
        event.preventDefault();
        // Handle form submission logic here

        // Close the modal after submission
        handleCloseCertification();
    };
    
    const [value, setValue] = useState(3); // Default value can be set here

    const handleChange = (event) => {
        setValue(event.target.value);
    };  

    return (
        <Container fluid className='createResumePage'>
            <Row className="justify-content-md-center text-center text-md-start headRow mt-5">

                {/* Input Column*/}
                <Col lg={5} sm={11} className="align-items-center" style={{border:'1px solid black' }}>
                    <div className='textHeader pt-3'>
                        <h3>Basic Information</h3>
                        <hr></hr>
                    </div>
                    <div className='information'>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="name" placeholder="Enter Full Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicHeadline">
                                <Form.Label>Headline</Form.Label>
                                <Form.Control type="headline" placeholder="Enter Headline" />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Email" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicWebsite">
                                        <Form.Label>Website</Form.Label>
                                        <Form.Control type="website" placeholder="Enter Website" />
                                    </Form.Group>
                                </Col>  
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicContact">
                                        <Form.Label>Contact No.</Form.Label>
                                        <Form.Control type="contact" placeholder="Enter Contact No." />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicLocation">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="location" placeholder="Enter Location" />
                                    </Form.Group>
                                </Col>  
                            </Row>
                            <hr></hr>
                            <div className='textHeader py-1'>
                                <h3>Summary</h3>
                            </div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <hr></hr>
                            <div className='textHeader py-1'>
                                <h3>Experience</h3>
                            </div>
                            <div className="addItem py-2 mb-4" onClick={handleShowExperience}>+ Add a New Item</div>

                            <Modal show={showExperienceModal} onHide={handleCloseExperience}>
                                <Modal.Header closeButton>
                                    <Modal.Title>+ Add Experience</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleSubmitExperience}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formCompany">
                                                    <Form.Label>Company</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Company Name" required />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formPosition">
                                                    <Form.Label>Position</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Position" required />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <Form.Group className="mb-3" controlId="formDateRange">
                                                <Form.Label>Date Range</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Date Range" required />
                                            </Form.Group>
                                            </Col>                                   
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formLocation">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Location" required />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className='textHeader py-1'>
                                            <Form.Label>Summary</Form.Label>
                                        </div>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="createItem py-2" onClick={handleCloseExperience}>Add</div>
                                </Modal.Footer>
                            </Modal>
                        
                        <hr></hr>
                        <div className='textHeader py-1'>
                            <h3>Education</h3>
                        </div>
                        <div className="addItem mb-4 py-2" onClick={handleShowEducation}>+ Add a New Item</div>

                        <Modal show={showEducationModal} onHide={handleCloseEducation}>
                            <Modal.Header closeButton>
                                <Modal.Title>+ Add Education</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmitEducation}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formInstitution">
                                                <Form.Label>Institution</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Institution Name" required />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formDateRange">
                                                <Form.Label>Date Range</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Date Range" required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formTypeOfStudy">
                                                <Form.Label>Type of Study</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Type of Study" required />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formAreaOfStudy">
                                                <Form.Label>Area of Study</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Area of Study" required />
                                            </Form.Group> 
                                        </Col>
                                    </Row> 
                                    <div className='textHeader py-1'>
                                        <Form.Label>Summary</Form.Label>
                                    </div>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="createItem py-2" onClick={handleCloseEducation}>Add</div>
                            </Modal.Footer>
                        </Modal>
                        <hr></hr>
                        <div className='textHeader py-1'>
                            <h3>Skill</h3>
                        </div>
                        <div className="addItem mb-4 py-2" onClick={handleShowSkill}>+ Add a New Item</div>

                        <Modal show={showSkillModal} onHide={handleCloseSkill}>
                            <Modal.Header closeButton>
                                <Modal.Title>+ Add Skill</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmitSkill}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Skill Name" required />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formDateRange">
                                                <Form.Label>Date Range</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Date Range" required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="formRange">
                                        <Form.Label>Level: {value}</Form.Label>
                                        <Form.Range
                                        min={1}
                                        max={5}
                                        value={value}
                                        onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="createItem py-2" onClick={handleCloseSkill}>Add</div>
                            </Modal.Footer>
                        </Modal>
                        <hr></hr>
                            <div className='textHeader py-1'>
                                <h3>Certifications</h3>
                            </div>
                            <div className="addItem py-2 mb-4" onClick={handleShowCertification}>+ Add a New Item</div>

                            <Modal show={showCertificationModal} onHide={handleCloseCertification}>
                                <Modal.Header closeButton>
                                    <Modal.Title>+ Add Certification</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleSubmitCertification}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formCertification">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Certification" required />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formIssuer">
                                                    <Form.Label>Issuer</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Issuer" required />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <Form.Group className="mb-3" controlId="formDate">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Date" required />
                                            </Form.Group>
                                            </Col>                                   
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formWebsite">
                                                    <Form.Label>Website</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Website" required />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className='textHeader py-1'>
                                            <Form.Label>Summary</Form.Label>
                                        </div>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control as="textarea" rows={3} />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="createItem py-2" onClick={handleCloseCertification}>Add</div>
                                </Modal.Footer>
                            </Modal>
                        </Form>
                    </div>
                </Col>
        
                {/* Display Column*/}
                <Col lg={6} sm={12} className="align-items-center" style={{border:'1px solid black' }}>
                    <div className='textHeader pt-3'>
                        <h3>Your Resume</h3>
                        <hr></hr>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateResume;

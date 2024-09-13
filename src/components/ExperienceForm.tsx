import { useState, FormEvent } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

interface Experience {
    company: string;
    companyPosition: string;
    companyDateRange: string;
    companyLocation: string;
    companySummary: string;
}

interface ExperienceFormProps {
    experiences: Experience[];
    setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, setExperiences }) => {
    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // Form fields for experience
    const [company, setCompany] = useState('');
    const [companyPosition, setCompanyPosition] = useState('');
    const [companyDateRange, setCompanyDateRange] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [companySummary, setCompanySummary] = useState('');

    const handleShowExperience = () => setShowExperienceModal(true);
    const handleCloseExperience = () => {
        setShowExperienceModal(false);
        setEditIndex(null);
        resetModalFields();
    };

    const resetModalFields = () => {
        setCompany('');
        setCompanyPosition('');
        setCompanyDateRange('');
        setCompanyLocation('');
        setCompanySummary('');
    };

    const handleSubmitExperience = (event: FormEvent) => {
        event.preventDefault();
        const newExperience = { company, companyPosition, companyDateRange, companyLocation, companySummary };

        if (editIndex !== null) {
            const updatedExperiences = [...experiences];
            updatedExperiences[editIndex] = newExperience;
            setExperiences(updatedExperiences);
            setEditIndex(null);
        } else {
            setExperiences([...experiences, newExperience]);
        }

        handleCloseExperience();
        resetModalFields();
    };

    const handleEditExperience = (index: number) => {
        const experienceToEdit = experiences[index];
        setCompany(experienceToEdit.company);
        setCompanyPosition(experienceToEdit.companyPosition);
        setCompanyDateRange(experienceToEdit.companyDateRange);
        setCompanyLocation(experienceToEdit.companyLocation);
        setCompanySummary(experienceToEdit.companySummary);
        setEditIndex(index);
        handleShowExperience();
    };

    const handleDeleteExperience = (index: number) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
    };

    return (
        <>
            <div className="addItem py-2 mb-4" onClick={handleShowExperience}>+ Add a New Item</div>
            {experiences.map((experience, index) => (
                <div key={index} className="mb-3">
                    <p><strong>{experience.companyPosition}</strong> at {experience.company}</p>
                    <Button variant="secondary" size="sm" onClick={() => handleEditExperience(index)}>Edit</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteExperience(index)}>Delete</Button>
                </div>
            ))}

            <Modal show={showExperienceModal} onHide={handleCloseExperience}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? "Edit Experience" : "+ Add Experience"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitExperience}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formCompany">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Company Name"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formPosition">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Position"
                                        value={companyPosition}
                                        onChange={(e) => setCompanyPosition(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formDateRange">
                                    <Form.Label>Date Range</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Date"
                                        value={companyDateRange}
                                        onChange={(e) => setCompanyDateRange(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formLocation">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Location"
                                        value={companyLocation}
                                        onChange={(e) => setCompanyLocation(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formSummary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Summary of work experience"
                                value={companySummary}
                                onChange={(e) => setCompanySummary(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {editIndex !== null ? "Save Changes" : "Add Experience"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ExperienceForm;

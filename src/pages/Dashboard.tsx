import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { BsPlusLg, BsFileEarmarkText } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../App.css';

function Dashboard() {
  // State to track active sidebar item
  const [activeItem, setActiveItem] = useState('dashboard');

  // State for modal
  const [showResumeModal, setShowResumeModal] = useState(false);

  // State for form inputs
  const [resumeTitle, setResumeTitle] = useState('');
  const [resumeTemplate, setResumeTemplate] = useState('');

  // Create a navigate function
  const navigate = useNavigate();

  // Function to handle sidebar item click
  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  // Function to navigate to CreateResume.tsx
  const handleCreateResumeClick = (resumeId: number) => {
    navigate('/resume', { state: { resumeId } }); 
  };
  

  const handleCloseResume = () => setShowResumeModal(false);
  const handleShowResume = () => setShowResumeModal(true);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeTitle(e.target.value);
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResumeTemplate(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: resumeTitle,
          template: resumeTemplate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Resume added successfully:', data);

      const resumeId = data.id;

      // Redirect to CreateResume.tsx
      handleCreateResumeClick(resumeId);
    } catch (error) {
      console.error('Failed to add resume:', error);
    }
  };

  

  // Conditional content based on active item
  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return (
          <Row className='px-2 dashboardrow'>
            <Col lg={3} md={4} xs={12} className='mb-4'>
              <div className='vertical-card' onClick={handleShowResume}>
                <div className='icon-container'>
                  <span className="material-icons add-icon"><BsPlusLg /></span>
                </div>
                <p className='subtitle'>Create a new Resume</p>
              </div>
            </Col>
            <Col lg={3} md={4} xs={12} className='mb-4'>
              <div className='vertical-card' onClick={handleCreateResumeClick}>
                <div className='icon-container'>
                  <span className="material-icons add-icon"><BsFileEarmarkText /></span>
                </div>
                <p className='resumetitle'>Resume Title</p>
              </div>
            </Col>
          </Row>
        );
      case 'settings':
        return <p>Settings content goes here</p>;
      case 'profile':
        return <p>Profile content goes here</p>;
      case 'logout':
        return <p>Logout content goes here</p>;
      default:
        return null;
    }
  };

  return (
    <Container fluid className='dashboard'>
      <Row className="dashrow">
        {/* Sidebar */}
        <Col className='accountCol' xs={12} md={3}>
          <div
            className={`sidebar-item my-3 ${activeItem === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleItemClick('dashboard')}
          >
            <div className='sidebar-header'>Dashboard</div>
          </div>
          <div
            className={`sidebar-item my-3 ${activeItem === 'settings' ? 'active' : ''}`}
            onClick={() => handleItemClick('settings')}
          >
            <div className='sidebar-header'>Settings</div>
          </div>
          <div
            className={`sidebar-item my-3 ${activeItem === 'profile' ? 'active' : ''}`}
            onClick={() => handleItemClick('profile')}
          >
            <div className='sidebar-header'>Profile</div>
          </div>
          <div
            className={`sidebar-item my-3 ${activeItem === 'logout' ? 'active' : ''}`}
            onClick={() => handleItemClick('logout')}
          >
            <div className='sidebar-header'>Logout</div>
          </div>
        </Col>
        
        {/* Main content */}
        <Col className='dashboardCol' xs={12} md={9}>
          {renderContent()}
        </Col>
      </Row>

      {/* Resume Modal */}
      <Modal show={showResumeModal} onHide={handleCloseResume}>
        <Modal.Header closeButton>
          <Modal.Title>+ Create a New Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Resume Name"
            className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              value={resumeTitle}
              onChange={handleTitleChange}
            />
          </FloatingLabel>
          <Form.Select
            className='py-3'
            aria-label="Default select example"
            value={resumeTemplate}
            onChange={handleTemplateChange}
          >
            <option>Choose Template</option>
            <option value="Professional">Professional</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <div className="editDelItem py-2" onClick={handleSubmit}>Create</div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;

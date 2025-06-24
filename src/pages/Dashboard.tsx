import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { BsPlusLg, BsFileEarmarkText, BsGear, BsPerson, BsGrid, BsX } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../App';
import '../App.css';

function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(true);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [resumeTemplate, setResumeTemplate] = useState('');
  const [resumes, setResumes] = useState<any[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleItemClick = (item: string) => setActiveItem(item);
  const handleCloseResume = () => setShowResumeModal(false);
  const handleShowResume = () => setShowResumeModal(true);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setResumeTitle(e.target.value);
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => setResumeTemplate(e.target.value);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/resumes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleSubmit = async () => {
    if (!resumeTitle || !resumeTemplate) return alert("Fill in title and template");

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          title: resumeTitle,
          template: resumeTemplate,
          name: "", headline: "", email: "", website: "",
          contact: "", location: "", summary: "", institution: ""
        }),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const newResume = await response.json();
      setResumes(prev => [...prev, newResume]);
      setResumeTitle(''); setResumeTemplate(''); handleCloseResume();
      handleCreateResumeClick(newResume.id);
    } catch (error) {
      console.error('Failed to add resume:', error);
    }
  };

  const handleCreateResumeClick = (resumeId: number) => navigate('/resume', { state: { resumeId } });

  const handleDelete = (id: number) => {
    setResumes(prev => prev.filter(resume => resume.id !== id));
    // You can also trigger backend delete here
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return (
          <Row className='dashboardrow'>
            <Col lg={3} md={4} xs={12} className='mb-4'>
              <div className='vertical-card create-card' onClick={handleShowResume}>
                <div className='icon-container'><BsPlusLg size={36} /></div>
                <p className='subtitle'>Create a new Resume</p>
              </div>
            </Col>
            {resumes.map((resume) => (
              <Col key={resume.id} lg={3} md={4} xs={12} className='mb-4'>
                <div
                  className='vertical-card position-relative'
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCreateResumeClick(resume.id)}
                >
                  <span
                    style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, color: '#ac0101', cursor: 'pointer' }}
                    onClick={e => { e.stopPropagation(); handleDelete(resume.id); }}
                    title="Delete"
                  >
                    <BsX size={24} />
                  </span>
                  <div className='icon-container'>
                    <BsFileEarmarkText size={36} />
                  </div>
                  <p className='resumetitle'>{resume.title}</p>
                </div>
              </Col>
            ))}
          </Row>
        );
      case 'settings': return <p>Settings content goes here</p>;
      case 'profile': return <p>Profile content goes here</p>;
      default: return null;
    }
  };

  return (
    <Container fluid className='dashboard'>
      <div className="dashrow d-flex">
        <div
          className={`accountCol ${collapsed ? 'collapsed' : 'expanded'}`}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        >
          <div className={`sidebar-item my-4 ${activeItem === 'dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('dashboard')}>
            <BsGrid size={20} />
            {!collapsed && <span className='sidebar-label'>Dashboard</span>}
          </div>
          <div className={`sidebar-item my-4 ${activeItem === 'settings' ? 'active' : ''}`} onClick={() => handleItemClick('settings')}>
            <BsGear size={20} />
            {!collapsed && <span className='sidebar-label'>Settings</span>}
          </div>
          <div className={`sidebar-item my-4 ${activeItem === 'profile' ? 'active' : ''}`} onClick={() => handleItemClick('profile')}>
            <BsPerson size={20} />
            {!collapsed && <span className='sidebar-label'>Profile</span>}
          </div>
        </div>

        <div className="dashboardCol flex-grow-1">
          {renderContent()}
        </div>
      </div>

      <Modal show={showResumeModal} onHide={handleCloseResume}>
        <Modal.Header closeButton><Modal.Title>+ Create a New Resume</Modal.Title></Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Resume Name" className="mb-3">
            <Form.Control type="text" placeholder="Name" value={resumeTitle} onChange={handleTitleChange} />
          </FloatingLabel>
          <Form.Select className='py-3' value={resumeTemplate} onChange={handleTemplateChange}>
            <option>Choose Template</option>
            <option value="Professional">Professional</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={handleSubmit}>Create</button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;

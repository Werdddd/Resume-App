import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; // For converting HTML to image
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Modal } from 'react-bootstrap';
import { FaMapPin } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { MdOutlineTextSnippet } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BsMortarboard } from "react-icons/bs";
import { BsBriefcase } from "react-icons/bs";
import { BsCodeSlash } from "react-icons/bs";
import { BsPuzzle } from "react-icons/bs";
import { BsFileText } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../App.css"

function CreateResume() {

    const navigate = useNavigate();

    const locationId = useLocation();
  
    const { resumeId } = locationId.state || {};
  

    const [showExperienceModal, setShowExperienceModal] = useState(false);
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showLeadershipModal, setShowLeadershipModal] = useState(false);

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editEducIndex, setEditEducIndex] = useState<number | null>(null);
    const [editSkillIndex, setEditSkillIndex] = useState<number | null>(null);
    const [editProjectIndex, setEditProjectIndex] = useState<number | null>(null);
    const [editLeadershipIndex, setEditLeadershipIndex] = useState<number | null>(null);

    // Basic information states
    // const [resumeId, setResumeId] = useState('');
    // Basic information states
    const [fullName, setFullName] = useState('');
    const [headline, setHeadline] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState('');
    const [summary, setSummary] = useState('');

    const [profilePhoto, setProfilePhoto] = useState<string | ArrayBuffer | null>(null);

    const resumeRef = useRef(null);  // Reference to the display column

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Education states
    const [education, setEducation] = useState([]);
    const [institution, setInstitution] = useState('');
    const [educLocation, setEducLocation] = useState('');
    const [educCourse, setEducCourse] = useState('');
    const [educDate, setEducDate] = useState('');
    const [educSummary, setEducSummary] = useState('');

    const handleCloseEducation = () => {
        setShowEducationModal(false);
        setEditEducIndex(null);
    };
    const handleShowEducation = () => setShowEducationModal(true);

    // Handle adding or editing an education
    const handleSubmitEducation = (event: any) => {
        event.preventDefault();
        const newEducation = {
            institution,
            educLocation,
            educCourse,
            educDate,
            educSummary
        };
        
        if (editEducIndex !== null) {
            // Update education
            const updatedEducation = [...education];
            updatedEducation[editEducIndex] = newEducation;
            setEducation(updatedEducation);
            setEditEducIndex(null);
        } else {
            // Add new education
            setEducation([...education, newEducation]);
        }
        
        handleCloseEducation();
        resetEducModalFields();
    };

    const resetEducModalFields = () => {
        setInstitution('');
        setEducLocation('');
        setEducCourse('');
        setEducDate('');
        setEducSummary('');
    };

    // Handle editing an education
    const handleEditEducation = (index: number) => {
        const educationToEdit = education[index];
        setInstitution(educationToEdit.institution);
        setEducLocation(educationToEdit.educLocation);
        setEducCourse(educationToEdit.educCourse);
        setEducDate(educationToEdit.educDate);
        setEducSummary(educationToEdit.educSummary);
        setEditEducIndex(index);
        handleShowEducation();
    };

    // Handle deleting an education
    const handleDeleteEducation = (index: number) => {
        const updatedEducation = education.filter((_, i) => i !== index);
        setEducation(updatedEducation);
    };

    // Experience states
    const [experiences, setExperiences] = useState([]);
    const [company, setCompany] = useState('');
    const [companyPosition, setCompanyPosition] = useState('');
    const [companyDateRange, setCompanyDateRange] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [companySummary, setCompanySummary] = useState('');

    const handleCloseExperience = () => {
        setShowExperienceModal(false);
        setEditIndex(null);
    };
    const handleShowExperience = () => setShowExperienceModal(true);

    // Handle adding or editing an experience
    const handleSubmitExperience = (event: any) => {
        event.preventDefault();
        const newExperience = {
            company,
            companyPosition,
            companyDateRange,
            companyLocation,
            companySummary
        };
        
        if (editIndex !== null) {
            // Update experience
            const updatedExperiences = [...experiences];
            updatedExperiences[editIndex] = newExperience;
            setExperiences(updatedExperiences);
            setEditIndex(null);
        } else {
            // Add new experience
            setExperiences([...experiences, newExperience]);
        }
        
        handleCloseExperience();
        resetModalFields();
    };

    const resetModalFields = () => {
        setCompany('');
        setCompanyPosition('');
        setCompanyDateRange('');
        setCompanyLocation('');
        setCompanySummary('');
    };

    // Handle editing an experience
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

    // Handle deleting an experience
    const handleDeleteExperience = (index: number) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
    };

    // Skill states
    const [skills, setSkills] = useState([]);
    const [skillCategory, setSkillCategory] = useState('');
    const [skillName, setSkillName] = useState('');
    const [skillDesc, setSkillDesc] = useState('');

    const handleCloseSkill = () => {
        setShowSkillModal(false);
        setEditSkillIndex(null);
    };
    const handleShowSkill = () => setShowSkillModal(true);

    // Handle adding or editing a skill
    const handleSubmitSkill = (event: any) => {
        event.preventDefault();
        const newSkill = {
            skillCategory,
            skillName,
            skillDesc
        };
        
        if (editSkillIndex !== null) {
            // Update skill
            const updatedSkills = [...skills];
            updatedSkills[editSkillIndex] = newSkill;
            setSkills(updatedSkills);
            setEditSkillIndex(null);
        } else {
            // Add new skill
            setSkills([...skills, newSkill]);
        }
        
        handleCloseSkill();
        resetSkillModalFields();
    };

    const resetSkillModalFields = () => {
        setSkillCategory('');
        setSkillName('');
        setSkillDesc('');
    };

    // Handle editing a skill
    const handleEditSkill = (index: number) => {
        const skillToEdit = skills[index];
        setSkillCategory(skillToEdit.skillCategory);
        setSkillName(skillToEdit.skillName);
        setSkillDesc(skillToEdit.skillDesc);
        setEditSkillIndex(index);
        handleShowSkill();
    };

    // Handle deleting a skill
    const handleDeleteSkill = (index: number) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };

    // Project states
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectDate, setProjectDate] = useState('');
    const [projectDesc, setProjectDesc] = useState('');

    const handleCloseProject = () => {
        setShowProjectModal(false);
        setEditProjectIndex(null);
    };
    const handleShowProject = () => setShowProjectModal(true);

    // Handle adding or editing a project
    const handleSubmitProject = (event: any) => {
        event.preventDefault();
        const newProject = {
            projectName,
            projectDate,
            projectDesc
        };
        
        if (editProjectIndex !== null) {
            // Update Project
            const updatedProjects = [...projects];
            updatedProjects[editProjectIndex] = newProject;
            setProjects(updatedProjects);
            setEditProjectIndex(null);
        } else {
            // Add new Project
            setProjects([...projects, newProject]);
        }
        
        handleCloseProject();
        resetProjectModalFields();
    };

    const resetProjectModalFields = () => {
        setProjectName('');
        setProjectDate('');
        setProjectDesc('');
    };

    // Handle editing a project
    const handleEditProject = (index: number) => {
        const projectToEdit = projects[index];
        setProjectName(projectToEdit.projectName);
        setProjectDate(projectToEdit.projectDate);
        setProjectDesc(projectToEdit.projectDesc);
        setEditProjectIndex(index);
        handleShowProject();
    };

    // Handle deleting a project
    const handleDeleteProject = (index: number) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
    };

    // Leadership states
    const [leaderships, setLeaderships] = useState([]);
    const [orgName, setOrgName] = useState('');
    const [orgPosition, setOrgPosition] = useState('');
    const [orgDate, setOrgDate] = useState('');
    const [orgLocation, setOrgLocation] = useState('');
    const [orgDesc, setOrgDesc] = useState('');

    const handleCloseLeadership = () => {
        setShowLeadershipModal(false);
        setEditLeadershipIndex(null);
    };
    const handleShowLeadership = () => setShowLeadershipModal(true);

    // Handle adding or editing a Leadership
    const handleSubmitLeadership = (event: any) => {
        event.preventDefault();
        const newLeadership = {
            orgName,
            orgPosition,
            orgDate,
            orgLocation,
            orgDesc
        };
        
        if (editLeadershipIndex !== null) {
            // Update Leadership
            const updatedLeaderships = [...leaderships];
            updatedLeaderships[editLeadershipIndex] = newLeadership;
            setLeaderships(updatedLeaderships);
            setEditLeadershipIndex(null);
        } else {
            // Add new Leadership
            setLeaderships([...leaderships, newLeadership]);
        }
        
        handleCloseLeadership();
        resetLeadershipModalFields();
    };

    const resetLeadershipModalFields = () => {
        setOrgName('');
        setOrgPosition('');
        setOrgDate('');
        setOrgDesc('');
    };

    // Handle editing a Leadership
    const handleEditLeadership = (index: number) => {
        const leadershipToEdit = leaderships[index];
        setOrgName(leadershipToEdit.orgName);
        setOrgPosition(leadershipToEdit.orgPosition);
        setOrgDate(leadershipToEdit.orgDate);
        setOrgLocation(leadershipToEdit.orgLocation);
        setOrgDesc(leadershipToEdit.orgDesc);
        setEditLeadershipIndex(index);
        handleShowLeadership();
    };

    // Handle deleting a Leadership
    const handleDeleteLeadership = (index: number) => {
        const updatedLeaderships = leaderships.filter((_, i) => i !== index);
        setLeaderships(updatedLeaderships);
    };

    const saveAllChanges = async (id: number, name: string, headline: string, email: string, website: string, contact: number, location: string, summary: string, institution: string) => {

        try {
          const response = await fetch(`http://localhost:5000/api/resumes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              headline: headline,
              email: email,
              website: website,
              contact: contact,
              location: location,
              summary: summary,
              institution: institution,
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log('Resume updated successfully:', data);
        } catch (error) {
          console.error('Failed to update resume:', error);
        }
      };
      
    // PDF export function
    const exportToPDF = () => {
        const input = resumeRef.current;
        if (input) {
            html2canvas(input)
                .then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('resume.pdf');
                });
        }
    };
    

    return (
        <Container fluid className='createResumePage'>
            <Row className="justify-content-md-center text-center text-md-start headRow mt-3">
                {/* Form Column */}
                <Col lg={5} sm={12} className="align-items-center">
                    <div className='textHeader pt-3'>
                        <h3 style={{ display: 'flex', alignItems: 'center' }}><MdOutlinePersonOutline style={{ marginRight: '15px' }} />Basic Information</h3>
                        <hr />
                    </div>
                    
                    <div className='information'>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicPhoto">
                            <Form.Label>Profile Photo</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/*" 
                                onChange={handlePhotoChange} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Full Name" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicHeadline">
                            <Form.Label>Headline</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Headline" 
                                value={headline} 
                                onChange={(e) => setHeadline(e.target.value)} 
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter Email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicWebsite">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Website" 
                                        value={website} 
                                        onChange={(e) => setWebsite(e.target.value)} 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicContact">
                                    <Form.Label>Contact No.</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Contact No." 
                                        value={contact} 
                                        onChange={(e) => setContact(e.target.value)} 
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicLocation">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Location" 
                                        value={location} 
                                        onChange={(e) => setLocation(e.target.value)} 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr></hr>
                        <div className='textHeader py-1'>
                            <h3 style={{ display: 'flex', alignItems: 'center' }}><MdOutlineTextSnippet style={{ marginRight: '15px' }} />Summary</h3>
                        </div>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={summary} 
                                onChange={(e) => setSummary(e.target.value)} 
                            />
                        </Form.Group>

                        {/*Education*/}
                        <hr></hr>
                        <div className='textHeader py-1'>
                            <h3 style={{ display: 'flex', alignItems: 'center' }}><BsMortarboard style={{ marginRight: '15px' }} />Education</h3>
                        </div>
                        <div className="addItem py-2 mb-4" onClick={handleShowEducation}>+ Add a New Item</div>

                        {/* List of Education with Edit/Delete options */}
                        {education.map((education, index) => (
                            <div key={index} className="mb-3">
                                <Row>
                                    <Col style={{ display: 'flex', justifyContent: 'left' }}>
                                        <p><strong>{education.institution}</strong> at {education.educLocation}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', justifyContent: 'right', gap: '0.5rem' }}>
                                        <div className="editDelItem py-2" onClick={() => handleEditEducation(index)}>Edit</div>
                                        <div className="editDelItem py-2" onClick={() => handleDeleteEducation(index)}>Delete</div>
                                        
                                    </Col>
                                </Row>

                                
                               
                            </div>
                        ))}

                        <Modal show={showEducationModal} onHide={handleCloseEducation}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editEducIndex !== null ? "Edit Education" : "+ Add Education"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmitEducation}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formInstitution">
                                                <Form.Label>Institution</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Institution Name"
                                                    value={institution} 
                                                    onChange={(e) => setInstitution(e.target.value)}                                       
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formEducLocation">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Location"
                                                    value={educLocation} 
                                                    onChange={(e) => setEducLocation(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formCourse">
                                                <Form.Label>Course</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Course" 
                                                    value={educCourse} 
                                                    onChange={(e) => setEducCourse(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>                                   
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formEducDate">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Date Range"
                                                    value={educDate} 
                                                    onChange={(e) => setEducDate(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3" controlId="formEducSummary">
                                        <Form.Label>Summary</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Summary of education"
                                            value={educSummary} 
                                            onChange={(e) => setEducSummary(e.target.value)}
                                            required />
                                    </Form.Group>
                                    <div className="editDelItem py-2" onClick={handleSubmitEducation}>
                                        {editIndex !== null ? "Save Changes" : "Add Education"}
                                    </div>
                                    
                                </Form>
                            </Modal.Body>
                        </Modal>
                        
                        {/*Experience*/}
                        <hr></hr>
                        <div className='textHeader py-1'>
                            <h3 style={{ display: 'flex', alignItems: 'center' }}><BsBriefcase style={{ marginRight: '15px' }} />Experience</h3>
                        </div>
                        <div className="addItem py-2 mb-4" onClick={handleShowExperience}>+ Add a New Item</div>

                        {/* List of Experiences with Edit/Delete options */}
                        {experiences.map((experience, index) => (
                            <div key={index} className="mb-3">
                                <Row>
                                    <Col style={{ display: 'flex', justifyContent: 'left' }}>
                                        <p><strong>{experience.companyPosition}</strong> at {experience.company}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', justifyContent: 'right', gap: '0.5rem' }}>
                                        <div className="editDelItem py-2" onClick={() => handleEditExperience(index)}>Edit</div>
                                        <div className="editDelItem py-2" onClick={() => handleDeleteExperience(index)}>Delete</div>
                                        
                                    </Col>
                                </Row>

                                
                               
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
                                                    required />
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
                                                    required />
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
                                                    required />
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
                                                    required />
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
                                            required />
                                    </Form.Group>
                                    <div className="editDelItem py-2" onClick={handleSubmitExperience}>
                                        {editIndex !== null ? "Save Changes" : "Add Experience"}
                                    </div>
                                    
                                </Form>
                            </Modal.Body>
                        </Modal>
                        
                        {/*Skill*/}
                        <hr></hr>
                        <div className='textHeader py-1'>
                            <h3 style={{ display: 'flex', alignItems: 'center' }}><BsCodeSlash style={{ marginRight: '15px' }} />Skills</h3>
                        </div>
                        <div className="addItem py-2 mb-4" onClick={handleShowSkill}>+ Add a New Item</div>

                        {/* List of Skills with Edit/Delete options */}
                        {skills.map((skill, index) => (
                            <div key={index} className="mb-3">
                                <Row>
                                    <Col style={{ display: 'flex', justifyContent: 'left' }}>
                                        <p><strong>{skill.skillCategory}</strong> - {skill.skillName}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', justifyContent: 'right', gap: '0.5rem' }}>
                                        <div className="editDelItem py-2" onClick={() => handleEditSkill(index)}>Edit</div>
                                        <div className="editDelItem py-2" onClick={() => handleDeleteSkill(index)}>Delete</div>
                                        
                                    </Col>
                                </Row>

                                
                               
                            </div>
                        ))}

                        <Modal show={showSkillModal} onHide={handleCloseSkill}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editSkillIndex !== null ? "Edit Skill" : "+ Add Skill"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmitSkill}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formSkillCategory">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Category"
                                                    value={skillCategory} 
                                                    onChange={(e) => setSkillCategory(e.target.value)}                                       
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formSkillName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={skillName} 
                                                    onChange={(e) => setSkillName(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formSkillDesc">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Enter Description" 
                                                    value={skillDesc} 
                                                    onChange={(e) => setSkillDesc(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>                                  
                                    </Row>
                                    <div className="editDelItem py-2" onClick={handleSubmitSkill}>
                                        {editSkillIndex !== null ? "Save Changes" : "Add Skill"}
                                    </div>
                                    
                                </Form>
                            </Modal.Body>
                        </Modal>

                        {/*Project*/}
                        <hr></hr>
                        <div className='textHeader py-1'>
                            <h3 style={{ display: 'flex', alignItems: 'center' }}><BsPuzzle style={{ marginRight: '15px' }} />Projects</h3>
                        </div>
                        <div className="addItem py-2 mb-4" onClick={handleShowProject}>+ Add a New Item</div>

                        {/* List of Projects with Edit/Delete options */}
                        {projects.map((project, index) => (
                            <div key={index} className="mb-3">
                                <Row>
                                    <Col style={{ display: 'flex', justifyContent: 'left' }}>
                                        <p><strong>{project.projectName}</strong> - {project.projectDate}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', justifyContent: 'right', gap: '0.5rem' }}>
                                        <div className="editDelItem py-2" onClick={() => handleEditProject(index)}>Edit</div>
                                        <div className="editDelItem py-2" onClick={() => handleDeleteProject(index)}>Delete</div>
                                        
                                    </Col>
                                </Row>

                                
                               
                            </div>
                        ))}

                        <Modal show={showProjectModal} onHide={handleCloseProject}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editProjectIndex !== null ? "Edit Project" : "+ Add Project"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmitProject}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formProjectName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={projectName} 
                                                    onChange={(e) => setProjectName(e.target.value)}                                       
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formProjectDate">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Date"
                                                    value={projectDate} 
                                                    onChange={(e) => setProjectDate(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formProjectDesc">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Enter Description" 
                                                    value={projectDesc} 
                                                    onChange={(e) => setProjectDesc(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>                                  
                                    </Row>
                                    <div className="editDelItem py-2" onClick={handleSubmitProject}>
                                        {editProjectIndex !== null ? "Save Changes" : "Add Project"}
                                    </div>
                                    
                                </Form>
                            </Modal.Body>
                        </Modal>

                        {/*Leadership*/}
                        <hr></hr>
                        <div className='textHeader py-1'>
                            <h3 style={{ display: 'flex', alignItems: 'center' }}><BsPuzzle style={{ marginRight: '15px' }} />Leadership</h3>
                        </div>
                        <div className="addItem py-2 mb-4" onClick={handleShowLeadership}>+ Add a New Item</div>

                        {/* List of Leadership with Edit/Delete options */}
                        {leaderships.map((leadership, index) => (
                            <div key={index} className="mb-3">
                                <Row>
                                    <Col style={{ display: 'flex', justifyContent: 'left' }}>
                                        <p><strong>{leadership.orgPosition}</strong> at {leadership.orgName}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', justifyContent: 'right', gap: '0.5rem' }}>
                                        <div className="editDelItem py-2" onClick={() => handleEditLeadership(index)}>Edit</div>
                                        <div className="editDelItem py-2" onClick={() => handleDeleteLeadership(index)}>Delete</div>
                                        
                                    </Col>
                                </Row>

                                
                               
                            </div>
                        ))}

                        <Modal show={showLeadershipModal} onHide={handleCloseLeadership}>
                            <Modal.Header closeButton>
                                <Modal.Title>{editLeadershipIndex !== null ? "Edit Leadership" : "+ Add Leadership"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmitLeadership}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formOrgName">
                                                <Form.Label>Organization Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={orgName} 
                                                    onChange={(e) => setOrgName(e.target.value)}                                       
                                                    required />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formOrgPosition">
                                                <Form.Label>Position</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Position"
                                                    value={orgPosition} 
                                                    onChange={(e) => setOrgPosition(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formOrgDate">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Date" 
                                                    value={orgDate} 
                                                    onChange={(e) => setOrgDate(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>  
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formOrgLocation">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Location" 
                                                    value={orgLocation} 
                                                    onChange={(e) => setOrgLocation(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>                                  
                                    </Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formOrgDesc">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="Enter Description" 
                                                    value={orgDesc} 
                                                    onChange={(e) => setOrgDesc(e.target.value)}
                                                    required />
                                            </Form.Group>
                                        </Col>   
                                    <div className="editDelItem py-2" onClick={handleSubmitLeadership}>
                                        {editLeadershipIndex !== null ? "Save Changes" : "Add Leadership"}
                                    </div>
                                    
                                </Form>
                            </Modal.Body>
                        </Modal>

                        <hr></hr>
                        <div className="exportButton py-2 mb-4" onClick={() => saveAllChanges(resumeId, fullName, headline, email, website, contact, location, summary, institution)}>Save All Changes</div>
                        <div className="exportButton py-2 mb-4" onClick={exportToPDF}>Export to PDF</div>
                    </Form>

                    </div>

                </Col>

                {/* Display Column */}
                <Col lg={6} sm={12} className="align-items-center">
                    <div className='textHeader pt-3'>
                    <h3 style={{ display: 'flex', alignItems: 'center' }}><BsFileText style={{ marginRight: '15px' }} />Your Resume</h3>
                        <hr />
                    </div>
                    
                    <div className="resumeDisplay align-items-center p-5" ref={resumeRef}>
                        <div className="text-center"
                        style={fullName ? { borderBottom: '1px solid black', marginBottom: '10px' } : {}}>
                             {/* Display Profile Photo */}
                             {profilePhoto && <img src={profilePhoto as string} alt="Profile" className="profilePhoto" />}
                            {fullName && <h5>{fullName}</h5>}
                            {headline && <p>{headline}</p>}
                            <Row style={{fontSize : '12px'}}>
                                <Col>
                                {email && (
                                    <Col><p><FaAt /> {email}</p></Col>
                                )}
                                </Col>
                                <Col>
                                {website && (
                                    <Col><p><FaLink /> {website}</p></Col>
                                )}
                                </Col>
                                <Col>
                                {contact && (
                                    <Col><p><FaPhoneAlt /> {contact}</p></Col>
                                )}
                                </Col>
                                <Col>
                                {location && (
                                    <Col><p><FaMapPin /> {location}</p></Col>
                                )}
                                </Col>
                                
                                
                                
                            </Row>
                        </div>
                      



                        <Row
                            className="text-justify"
                            style={summary ? { borderBottom: '1px solid black', marginBottom: '10px' } : {}}
                            >
                            {summary && (
                                <>
                                <Col lg={2}>
                                    <p className="heading">Summary:</p>
                                </Col>
                                <Col lg={{ span: 9, offset: 1 }}>
                                    <p style={{lineHeight : '20px', textAlign : 'justify'}}>{summary}</p>
                                </Col>
                                </>
                            )}
                        </Row>
                        

                       

                        {/* Display added education */}
                        {education.map((educationItem, index) => (
                            <Row
                                className="text-justify"
                                key={index}
                                style={{
                                    lineHeight: '10px',
                                    marginTop: '15px',
                                    borderBottom: (index === education.length - 1 && (educationItem.educSummary || educationItem.educCourse)) 
                                        ? '1px solid black' 
                                        : 'none'
                                }}
                            >
                                <Col lg={2}>
                                    {index === 0 && <p className="heading">Education:</p>}
                                </Col>
                                <Col lg={{ span: 9, offset: 1 }}>
                                    <Row>
                                        <Col className="text-start">
                                            {educationItem.institution && <p className="heading">{educationItem.institution}</p>}
                                            {educationItem.educCourse && <p className="heading">{educationItem.educCourse}</p>}
                                            
                                        </Col>
                                        <Col className="text-end">
                                        {educationItem.educLocation && <p>{educationItem.educLocation}</p>}
                                            {educationItem.educDate && <p>{educationItem.educDate}</p>}
                                        </Col>
                                    </Row>
                                    {educationItem.educSummary && <p style={{ lineHeight: '20px', textAlign: 'justify' }}>{educationItem.educSummary}</p>}
                                </Col>
                            </Row>
                        ))}

                        {/* Display added experiences */}
                        {experiences.map((experience, index) => (
                            <Row
                                className="text-justify"
                                key={index}
                                style={{
                                    lineHeight: '10px', marginTop : '15px',
                                    borderBottom: (index === experiences.length - 1 && (experience.companySummary || experience.companyPosition))  ? '1px solid black' : 'none'
                                }}
                            >
                                <Col lg={2}>
                                    {index === 0 && <p className="heading">Experience:</p>}
                                </Col>
                                <Col lg={{ span: 9, offset: 1 }}>
                                    <Row>
                                        <Col className="text-start">
                                            {experience.company && <p className="heading">{experience.company}</p>}
                                            {experience.companyPosition && <p>{experience.companyPosition}</p>}
                                        </Col>
                                        <Col className="text-end">
                                            {experience.companyLocation && <p className="heading">{experience.companyLocation}</p>}
                                            {experience.companyDateRange && <p>{experience.companyDateRange}</p>}
                                            
                                        </Col>
                                    </Row>
                                    {experience.companySummary && (
                                        <p style={{ lineHeight: '20px', textAlign: 'justify' }}>{experience.companySummary}</p>
                                    )}
                                </Col>
                            </Row>
                        ))}

                        {/* Display added skills */}
                        {skills.map((skill, index) => (
                            <Row
                                className="text-justify"
                                key={index}
                                style={{
                                    lineHeight: '10px', marginTop : '15px',
                                    borderBottom: index === skills.length - 1 && skill.skillDesc ? '1px solid black' : 'none'
                                }}
                            >
                                <Col lg={2}>
                                    {index === 0 && <p className="heading">Skill:</p>}
                                </Col>
                                <Col lg={{ span: 9, offset: 1 }}>
                                    <Row>
                                        <Col className="text-start">
                                            {skill.skillCategory && <p className="heading">{skill.skillCategory}</p>}
                                            
                                        </Col>
                                        <Col className="text-end">
                                        {skill.skillName && <p className="heading">{skill.skillName}</p>}
                                            
                                        </Col>
                                        {skill.skillDesc && <p style={{ lineHeight: '20px', textAlign: 'justify' }}>{skill.skillDesc}</p>}
                                    </Row>
                                
                                </Col>
                            </Row>
                        ))}

                        {/* Display added projects */}
                        {projects.map((project, index) => (
                            <Row
                                className="text-justify"
                                key={index}
                                style={{
                                    lineHeight: '10px', marginTop : '15px',
                                    borderBottom: index === projects.length - 1 && project.projectDesc ? '1px solid black' : 'none'
                                }}
                            >
                                <Col lg={2}>
                                    {index === 0 && <p className="heading">Project:</p>}
                                </Col>
                                <Col lg={{ span: 9, offset: 1 }}>
                                    <Row>
                                        <Col className="text-start">
                                            {project.projectName && <p className="heading">{project.projectName}</p>}
                                            
                                        </Col>
                                        <Col className="text-end">
                                        {project.projectDate && <p className="heading">{project.projectDate}</p>}
                                            
                                        </Col>
                                        {project.projectDesc && <p style={{ lineHeight: '20px', textAlign: 'justify' }}>{project.projectDesc}</p>}
                                    </Row>
                                
                                </Col>
                            </Row>
                        ))}

                        {/* Display added leaderships */}
                        {leaderships.map((leadership, index) => (
                            <Row
                                className="text-justify"
                                key={index}
                                style={{
                                    lineHeight: '10px', marginTop : '15px',
                                    borderBottom: index === leaderships.length - 1 && leadership.orgDesc ? '1px solid black' : 'none'
                                }}
                            >
                                <Col lg={2}>
                                    {index === 0 && <p className="heading">Leadership:</p>}
                                </Col>
                                <Col lg={{ span: 9, offset: 1 }}>
                                    <Row>
                                        <Col className="text-start">
                                            {leadership.orgName && <p className="heading">{leadership.orgName}</p>}
                                            {leadership.orgPosition && <p className="heading">{leadership.orgPosition}</p>}
                                        </Col>
                                        <Col className="text-end">
                                        {leadership.orgLocation && <p>{leadership.orgLocation}</p>}
                                        {leadership.orgDate && <p>{leadership.orgDate}</p>}
                                        </Col>
                                        {leadership.orgDesc && <p style={{ lineHeight: '20px', textAlign: 'justify' }}>{leadership.orgDesc}</p>}
                                    </Row>
                                
                                </Col>
                            </Row>
                        ))}

                    </div>
                    
                </Col>
            </Row>
        </Container>
    );
}

export default CreateResume;

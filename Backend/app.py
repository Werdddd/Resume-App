from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pymysql
from flask import render_template

# Global database name
DB_NAME = 'resumes_andrew_db'

app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Configure MySQL Database Connection
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:@localhost/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define a Resume Model (Table)
class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    template = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    headline = db.Column(db.String(300), nullable=True)
    email = db.Column(db.String(100), nullable=True)
    website = db.Column(db.String(100), nullable=True)
    contact = db.Column(db.Integer, nullable=True)
    location = db.Column(db.String(100), nullable=True)
    summary = db.Column(db.Text, nullable=True)  # Changed to Text for longer content
    institution = db.Column(db.Text, nullable=True)  # Changed to Text for longer content
    profile_photo = db.Column(db.String(500), nullable=True)  # Added for profile photo URL
    education = db.Column(db.JSON, nullable=True)  # Added for education list
    experiences = db.Column(db.JSON, nullable=True)  # Added for experiences list  
    skills = db.Column(db.JSON, nullable=True)  # Added for skills list
    projects = db.Column(db.JSON, nullable=True)  # Added for projects list
    leaderships = db.Column(db.JSON, nullable=True)  # Added for leaderships list

    def __init__(self, title, template, name=None, headline=None, email=None, website=None, contact=None, location=None, summary=None, institution=None):
        self.title = title
        self.template = template
        self.name = name
        self.headline = headline
        self.email = email
        self.website = website
        self.contact = contact
        self.location = location
        self.summary = summary
        self.institution = institution

# Create database if it doesn't exist
def init_db():
    try:
        # Try connecting to the database
        pymysql.connect(host='localhost',
                       user='root',
                       password='',
                       database=DB_NAME)
    except pymysql.err.OperationalError as e:
        if e.args[0] == 1049:  # Database doesn't exist error code
            # Connect without database selected
            conn = pymysql.connect(host='localhost',
                                 user='root',
                                 password='')
            cursor = conn.cursor()
            # Create database
            cursor.execute(f'CREATE DATABASE IF NOT EXISTS {DB_NAME}')
            conn.commit()
            cursor.close()
            conn.close()

# Initialize database and tables
with app.app_context():
    init_db()
    db.create_all()

# API Route to get all resumes
@app.route('/api/resumes', methods=['GET'])
def get_resumes():
    resumes = Resume.query.all()
    resume_list = []
    for resume in resumes:
        resume_list.append({
            "id": resume.id,
            "title": resume.title,
            "template": resume.template,
            "name": resume.name
        })
    return jsonify(resume_list)

@app.route('/api/resumes', methods=['POST'])
def api_add_resume():
    data = request.json
    title = data.get('title')
    template = data.get('template')
    name = data.get('name')  # Extract 'name' from JSON
    headline = data.get('headline')  # Extract 'headline' from JSON
    email = data.get('email')
    website = data.get('website')
    contact = data.get('contact')
    location = data.get('location')
    summary = data.get('summary')
    institution = data.get('institution')
    
    if not title or not template:
        return jsonify({"error": "Title and template are required"}), 400

    new_resume = Resume(title=title, template=template, name=name, headline=headline, email=email, website=website, contact=contact, location=location, summary=summary, institution=institution)
    db.session.add(new_resume)
    db.session.commit()

    return jsonify({"id": new_resume.id}), 201

@app.route('/api/resumes/<int:id>', methods=['PUT'])
def update_resume(id):
    data = request.json
    name = data.get('name')
    headline = data.get('headline')
    email = data.get('email')
    website = data.get('website')
    contact = data.get('contact')
    location = data.get('location')
    summary = data.get('summary')
    institution = data.get('institution')

    if not name:
        return jsonify({"error": "Name is required to update"}), 400

    # Find the resume by ID
    resume = Resume.query.get(id)
    if not resume:
        return jsonify({"error": "Resume not found"}), 404

    # Update the resume's name
    resume.name = name
    resume.headline = headline
    resume.email = email
    resume.website = website
    resume.contact = contact
    resume.location = location
    resume.summary = summary
    resume.institution = institution

    db.session.commit()

    return jsonify({
        "id": resume.id,
        "title": resume.title,
        "template": resume.template,
        "headline": resume.headline,
        "name": resume.name,
        "email": resume.email,
        "website": resume.website,
        "contact": resume.contact,
        "location": resume.location,
        "summary": resume.summary,
        "institution": resume.institution
    }), 200

# Route to delete a resume
@app.route('/api/resumes/<int:id>', methods=['DELETE'])
def delete_resume(id):
    resume = Resume.query.get(id)
    if not resume:
        return jsonify({"error": "Resume not found"}), 404
    db.session.delete(resume)
    db.session.commit()
    return jsonify({"message": "Resume deleted successfully"}), 200

# API Route to get a single resume by ID
@app.route('/api/resumes/<int:resume_id>', methods=['GET'])
def get_resume_by_id(resume_id):
    try:
        resume = Resume.query.get(resume_id)
        if not resume:
            return jsonify({"error": "Resume not found"}), 404
        
        # Create a dictionary with all the fields needed
        resume_data = {
            "id": resume.id,
            "title": resume.title,
            "template": resume.template,
            "name": resume.name,
            "profilePhoto": resume.profile_photo,
            "headline": resume.headline,
            "email": resume.email,
            "website": resume.website,
            "contact": resume.contact,
            "location": resume.location,
            "summary": resume.summary,
            "institution": resume.institution,
            "education": resume.education,
            "experiences": resume.experiences,
            "skills": resume.skills,
            "projects": resume.projects,
            "leaderships": resume.leaderships
        }
        
        return jsonify(resume_data)
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred while retrieving the resume"}), 500

@app.route('/')
def index():
    return render_template('test.html')

if __name__ == "__main__":
    app.run(debug=True)

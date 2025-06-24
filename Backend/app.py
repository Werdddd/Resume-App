from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pymysql
from flask import render_template
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os

# Global database name
DB_NAME = 'resume_app_db'

app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Configure MySQL Database Connection
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:@localhost/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this to a secure secret key

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# User Model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # Relationship with resumes
    resumes = db.relationship('Resume', backref='user', lazy=True)

    def __init__(self, username, email, password_hash):
        self.username = username
        self.email = email
        self.password_hash = password_hash

# Define a Resume Model (Table)
class Resume(db.Model):
    __tablename__ = 'resume'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Add user relationship
    title = db.Column(db.String(100), nullable=False)
    template = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    headline = db.Column(db.String(300), nullable=True)
    email = db.Column(db.String(100), nullable=True)
    website = db.Column(db.String(100), nullable=True)
    contact = db.Column(db.String(20), nullable=True)  # Changed to String to allow leading zeros
    location = db.Column(db.String(100), nullable=True)
    summary = db.Column(db.Text, nullable=True)  # Changed to Text for longer content
    profile_photo = db.Column(db.Text, nullable=True)  # Changed to Text for longer base64 image data
    education = db.Column(db.JSON, nullable=True)  # Added for education list
    experiences = db.Column(db.JSON, nullable=True)  # Added for experiences list  
    skills = db.Column(db.JSON, nullable=True)  # Added for skills list
    projects = db.Column(db.JSON, nullable=True)  # Added for projects list
    leaderships = db.Column(db.JSON, nullable=True)  # Added for leaderships list

    def __init__(self, user_id, title, template, name=None, headline=None, email=None, website=None, contact=None, location=None, summary=None, education=None, experiences=None, skills=None, projects=None, leaderships=None, profile_photo=None):
        self.user_id = user_id
        self.title = title
        self.template = template
        self.name = name
        self.headline = headline
        self.email = email
        self.website = website
        self.contact = contact
        self.location = location
        self.summary = summary
        self.education = education
        self.experiences = experiences
        self.skills = skills
        self.projects = projects
        self.leaderships = leaderships
        self.profile_photo = profile_photo

# Authentication helper functions
def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def require_auth(f):
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"error": "No authorization header"}), 401
        
        try:
            token = auth_header.split(' ')[1]  # Bearer TOKEN
            user_id = verify_token(token)
            if not user_id:
                return jsonify({"error": "Invalid or expired token"}), 401
            return f(user_id, *args, **kwargs)
        except IndexError:
            return jsonify({"error": "Invalid authorization header format"}), 401
    
    decorated_function.__name__ = f.__name__
    return decorated_function

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
    db.create_all()    # Create tables if they don't exist


# Authentication endpoints
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required"}), 400
    
    # Check if user already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400
    
    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({"error": "Email already exists"}), 400
    
    # Create new user
    password_hash = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=password_hash)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        
        # Generate token
        token = generate_token(new_user.id)
        
        return jsonify({
            "message": "User created successfully",
            "token": token,
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to create user"}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Find user by username
    user = User.query.filter_by(username=username).first()
    
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid username or password"}), 401
    
    # Generate token
    token = generate_token(user.id)
    
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200

# API Route to get all resumes for a user
@app.route('/api/resumes', methods=['GET'])
@require_auth
def get_resumes(user_id):
    resumes = Resume.query.filter_by(user_id=user_id).all()
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
@require_auth
def api_add_resume(user_id):
    data = request.json
    title = data.get('title')
    template = data.get('template')
    name = data.get('name')
    headline = data.get('headline')
    email = data.get('email')
    website = data.get('website')
    contact = data.get('contact')
    location = data.get('location')
    summary = data.get('summary')
    education = data.get('education')
    experiences = data.get('experiences')
    skills = data.get('skills')
    projects = data.get('projects')
    leaderships = data.get('leaderships')
    profile_photo = data.get('profilePhoto')

    if not title or not template:
        return jsonify({"error": "Title and template are required"}), 400

    new_resume = Resume(
        user_id=user_id,
        title=title, 
        template=template, 
        name=name, 
        headline=headline, 
        email=email, 
        website=website, 
        contact=contact, 
        location=location, 
        summary=summary, 
        education=education,
        experiences=experiences,
        skills=skills,
        projects=projects,
        leaderships=leaderships,
        profile_photo=profile_photo
    )
    db.session.add(new_resume)
    db.session.commit()

    return jsonify({"id": new_resume.id}), 201

@app.route('/api/resumes/<int:id>', methods=['PUT'])
@require_auth
def update_resume(user_id, id):
    data = request.json
    name = data.get('name')
    headline = data.get('headline')
    email = data.get('email')
    website = data.get('website')
    contact = data.get('contact')
    location = data.get('location')
    summary = data.get('summary')
    education = data.get('education')
    experiences = data.get('experiences')
    skills = data.get('skills')
    projects = data.get('projects')
    leaderships = data.get('leaderships')
    profile_photo = data.get('profilePhoto')

    print(f"Received profile photo data: {profile_photo[:100] if profile_photo else 'None'}...")  # Debug log

    if not name:
        return jsonify({"error": "Name is required to update"}), 400

    # Find the resume by ID and ensure it belongs to the user
    resume = Resume.query.filter_by(id=id, user_id=user_id).first()
    if not resume:
        return jsonify({"error": "Resume not found"}), 404

    # Update the resume's fields
    resume.name = name
    resume.headline = headline
    resume.email = email
    resume.website = website
    resume.contact = contact
    resume.location = location
    resume.summary = summary
    resume.education = education
    resume.experiences = experiences
    resume.skills = skills
    resume.projects = projects
    resume.leaderships = leaderships
    resume.profile_photo = profile_photo

    print(f"Saving profile photo: {resume.profile_photo[:100] if resume.profile_photo else 'None'}...")  # Debug log

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
        "education": resume.education,
        "experiences": resume.experiences,
        "skills": resume.skills,
        "projects": resume.projects,
        "leaderships": resume.leaderships,
        "profilePhoto": resume.profile_photo
    }), 200

# Route to delete a resume
@app.route('/api/resumes/<int:id>', methods=['DELETE'])
@require_auth
def delete_resume(user_id, id):
    resume = Resume.query.filter_by(id=id, user_id=user_id).first()
    if not resume:
        return jsonify({"error": "Resume not found"}), 404
    db.session.delete(resume)
    db.session.commit()
    return jsonify({"message": "Resume deleted successfully"}), 200

# API Route to get a single resume by ID
@app.route('/api/resumes/<int:resume_id>', methods=['GET'])
@require_auth
def get_resume_by_id(user_id, resume_id):
    try:
        resume = Resume.query.filter_by(id=resume_id, user_id=user_id).first()
        if not resume:
            return jsonify({"error": "Resume not found"}), 404
        
        print(f"Retrieved profile photo: {resume.profile_photo[:100] if resume.profile_photo else 'None'}...")  # Debug log
        
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

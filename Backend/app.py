from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Configure MySQL Database Connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/resumes_db'  # Adjust to your database name and credentials
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
    summary = db.Column(db.String(100), nullable=True)

    def __init__(self, title, template, name=None, headline=None, email=None, website=None, contact=None, location=None, summary=None):
        self.title = title
        self.template = template
        self.name = name
        self.headline = headline
        self.email = email
        self.website = website
        self.contact = contact
        self.location = location
        self.summary = location

# Create the database and table if it doesn’t exist
with app.app_context():
    db.create_all()

# Route to display the list of resumes
@app.route('/')
def index():
    resumes = Resume.query.all()  # Fetch all resumes from the database
    return render_template('index.html', resumes=resumes)

# Deprecated
# Route to add a new resume via POST (HTML form)
@app.route('/add_resume', methods=['POST'])
def add_resume():
    title = request.form['title']
    template = request.form['template']
    name = request.form['name']
    
    new_resume = Resume(title=title, template=template, name=name)

    db.session.add(new_resume)
    db.session.commit()
    return redirect(url_for('index'))

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
    
    if not title or not template:
        return jsonify({"error": "Title and template are required"}), 400

    new_resume = Resume(title=title, template=template, name=name, headline=headline, email=email, website=website, contact=contact, location=location, summary=summary)
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
        "summary": resume.summary
    }), 200

# Route to delete a resume
@app.route('/delete_resume/<int:id>')
def delete_resume(id):
    resume = Resume.query.get(id)
    db.session.delete(resume)
    db.session.commit()
    return redirect(url_for('index'))

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
            "name": resume.name,
            "profilePhoto": resume.profile_photo,  # Assuming you store this in your database
            "headline": resume.headline,
            "email": resume.email,
            "website": resume.website,
            "contact": resume.contact,
            "location": resume.location,
            "summary": resume.summary,
            "education": resume.education,  # Make sure this returns a list of objects if it's a relationship
            "experiences": resume.experiences,  # Same for experiences
            "skills": resume.skills,
            "projects": resume.projects,
            "leaderships": resume.leaderships
        }
        
        return jsonify(resume_data)
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred while retrieving the resume"}), 500


if __name__ == "__main__":
    app.run(debug=True)

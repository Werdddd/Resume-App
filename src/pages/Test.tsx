import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Resume {
  id: number;
  title: string;
}

const Test: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchResumes = async () => {
    try {
      const response = await axios.get<Resume[]>('http://127.0.0.1:5000/api/resumes');
      setResumes(response.data);
      setError(null);
    } catch (err) {
      setError('There was an error fetching the resumes.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="Test">
      <h1>Resume List</h1>
      
      {error && <p>{error}</p>}
      
      <ul>
        {resumes.map((resume) => (
          <li key={resume.id}>
            <h2>{resume.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;

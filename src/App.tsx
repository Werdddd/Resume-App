import './App.css';
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import imagePath from './assets/resume-7.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateResume from './pages/CreateResume';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'; 

function App() {
  return (
    <Router>
      <NavBar
        brandName="EaseResume"
        imageSrcPath={imagePath}
        navItems={[
          { text: "Home", href: "/home" },
          { text: "Dashboard", href: "/dashboard" },
          { text: "Create Resume", href: "/resume" },
        ]}
      />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home for the root route */}
        <Route path="/home" element={<Home />} /> {/* Set Home for /home route */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/resume" element={<CreateResume />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;

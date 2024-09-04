import './App.css';
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import imagePath from './assets/resume-7.png';
import ContainerFluid from './components/ContainerFluid';
import FeaturesSection from './components/FeaturesSection';
import TemplatesSection from './components/TemplatesSection';
import StepsSection from './components/StepsSection';
import FeedbackSection from './components/FeedbackSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';


function App() {

  return (
    <div>
      <NavBar
        brandName="EaseResume"
        imageSrcPath={imagePath}
        navItems={[
          { text: "Home", href: "/" },
          { text: "About", href: "/about" },
          { text: "Services", href: "/services" },
          { text: "Contact", href: "/contact" },
        ]}
      />
      <ContainerFluid />
      <FeaturesSection />
      <TemplatesSection />
      <StepsSection />
      <FeedbackSection />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default App

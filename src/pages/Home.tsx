// Home.tsx
import ContainerFluid from '../components/ContainerFluid';
import FeaturesSection from '../components/FeaturesSection';
import TemplatesSection from '../components/TemplatesSection';
import StepsSection from '../components/StepsSection';
import FeedbackSection from '../components/FeedbackSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <ContainerFluid />
      <FeaturesSection />
      <TemplatesSection />
      <StepsSection />
      <FeedbackSection />
      <FAQSection />
      <Footer />
    </>
  );
}

export default Home;

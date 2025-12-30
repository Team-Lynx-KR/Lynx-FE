import { designTokens } from '../../design/tokens';
import LandingHeader from './components/LandingHeader';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import InterfaceSection from './components/InterfaceSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const Landing = () => {
  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: designTokens.colors.dark[900] }}>
      <LandingHeader />

      <main className="w-full">
        <HeroSection />
        <FeaturesSection />
        <InterfaceSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Landing;

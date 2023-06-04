import LandingBanner from '@/components/landing-banner/LandingBanner';
import SectionHeader from '@/components/section-header/SectionHeader';
import HowTo from '@/components/how-to/HowTo';

const Home = () => {
  return (
    <div>
      <LandingBanner />
      <SectionHeader text="How does this work?" />
      <HowTo />
    </div>
  );
};

export default Home;

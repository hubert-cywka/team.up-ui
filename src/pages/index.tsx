import LandingBanner from '@/components/landing-banner/LandingBanner';
import SectionHeader from '@/components/section-header/SectionHeader';

const Home = () => {
  return (
    <div>
      <LandingBanner />
      <SectionHeader text="How does this work?" />
    </div>
  );
};

export default Home;

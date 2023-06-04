import LandingBanner from '@/components/landing-banner/LandingBanner';
import SectionHeader from '@/components/section-header/SectionHeader';
import HowTo from '@/components/how-to/HowTo';

const Home = () => {
  return (
    <div>
      <LandingBanner />
      <SectionHeader
        header="How does this work?"
        subheader="4 steps is all it takes. Third one is even optional. So... why won't you try it?"
      />
      <HowTo />
    </div>
  );
};

export default Home;

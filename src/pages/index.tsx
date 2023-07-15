import LandingBanner from 'components/landing/landing-banner/LandingBanner';
import SectionHeader from 'components/primitives/section-header/SectionHeader';
import MainLayout from 'layouts/main/MainLayout';
import TilesContainer from 'components/primitives/tiles-container/TilesContainer';
import { HOW_TO_USE_STEPS } from 'shared/constants/ContentConstants';

const Home = () => {
  return (
    <MainLayout>
      <LandingBanner />
      <SectionHeader
        header="How does this work?"
        subheader="4 steps is all it takes. Third one is even optional. So... why won't you try it?"
      />
      <TilesContainer tiles={HOW_TO_USE_STEPS} />
    </MainLayout>
  );
};

export default Home;

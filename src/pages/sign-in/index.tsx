import SectionHeader from '@/components/section-header/SectionHeader';
import SignInForm from '@/components/sign-in-form/SignInForm';

const SignIn = () => {
  return (
    <>
      <SectionHeader header="Hi again!" subheader="It's nice to see you back!" />
      <SignInForm />
    </>
  );
};

export default SignIn;

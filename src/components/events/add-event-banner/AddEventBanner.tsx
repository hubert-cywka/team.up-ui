import styles from './AddEventBanner.module.scss';
import Button from 'components/primitives/button/Button';
import Link from 'next/link';
import { Route } from 'shared/constants/Route';
import { useSession } from 'next-auth/react';
import { routeWithReferer } from 'shared/utility/RouteUtils';

const AddEventBanner = () => {
  const isAuthenticated = useSession().status === 'authenticated';
  const header = isAuthenticated
    ? 'Nothing interesting?'
    : 'Nothing interesting? Sign in and add your own event!';
  const buttonText = isAuthenticated ? 'Add your own event!' : 'Sign in!';
  const route = isAuthenticated
    ? Route.ACTIVITIES_ADD
    : routeWithReferer(Route.SIGN_IN, Route.ACTIVITIES_ADD);

  return (
    <section className={styles.addEventBanner}>
      <h4 className={styles.header}>{header}</h4>
      <Link href={route}>
        <Button variant="main">{buttonText}</Button>
      </Link>
    </section>
  );
};

export default AddEventBanner;

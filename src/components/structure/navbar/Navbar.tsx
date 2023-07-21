'use client';

import styles from './Navbar.module.scss';
import Link from 'next/link';
import { Route } from '@shared/constants/Route';
import { useScrollDirection } from '@shared/hooks/misc/useScrollPosition';
import classNames from 'classnames';
import { ReactElement, useState } from 'react';
import Button from '@components/primitives/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuthSession } from '@shared/hooks/auth/useAuthSession';

const SCROLL_THRESHOLD = 25;

const Navbar = () => {
  const scrollDirection = useScrollDirection(SCROLL_THRESHOLD);
  const isHidden = scrollDirection === 'down';
  const [areNavigationTabsHidden, setAreNavigationTabsHidden] = useState(true);
  const isAuthenticated = useAuthSession().status === 'authenticated';

  const buildNavbarTab = (tabContent: string | ReactElement, route: string) => {
    return (
      <Link href={route} className={styles.tab}>
        {tabContent}
      </Link>
    );
  };

  const toggleNavigationVisibility = () => {
    setAreNavigationTabsHidden((prev) => !prev);
  };

  return (
    <header className={classNames(styles.pageNavbar, { [styles.collapsed]: isHidden })}>
      <Link href={Route.HOME} className={styles.logo}>
        Team.Up
      </Link>

      <nav
        className={classNames(styles.tabsContainer, {
          [styles.hidden]: areNavigationTabsHidden || isHidden
        })}>
        {buildNavbarTab('Home', Route.HOME)}
        {buildNavbarTab('Events', Route.EVENTS)}
        {isAuthenticated ? (
          <>
            {buildNavbarTab('Sign out', Route.SIGN_OUT)}
            {buildNavbarTab(
              <>
                Account <FontAwesomeIcon icon={faUser} />
              </>,
              Route.ACCOUNT
            )}
          </>
        ) : (
          <>
            {buildNavbarTab('Login', Route.SIGN_IN)}
            {buildNavbarTab('Register', Route.SIGN_UP)}
          </>
        )}
      </nav>

      <Button
        className={styles.toggleNavigationVisibilityButton}
        variant="secondary"
        onClick={toggleNavigationVisibility}>
        <FontAwesomeIcon icon={areNavigationTabsHidden && !isHidden ? faBars : faClose} />
      </Button>
    </header>
  );
};

export default Navbar;

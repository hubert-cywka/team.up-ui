'use client';

import styles from './Navbar.module.scss';
import Link from 'next/link';
import { Route } from 'shared/constants/Route';
import { useScrollDirection } from 'shared/hooks/useScrollPosition';
import classNames from 'classnames';
import { ReactElement, useState } from 'react';
import Button from '../../primitives/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';

const SCROLL_THRESHOLD = 25;

const Navbar = () => {
  const scrollDirection = useScrollDirection(SCROLL_THRESHOLD);
  const isHidden = scrollDirection === 'down';
  const [areNavigationTabsHidden, setAreNavigationTabsHidden] = useState(true);
  const session = useSession();

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

  const buildNavbar = () => {
    return (
      <nav
        className={classNames(styles.tabsContainer, {
          [styles.hidden]: areNavigationTabsHidden && !isHidden
        })}>
        {buildNavbarTab('HOME', Route.HOME)}
        {buildNavbarTab('ACTIVITIES', Route.ACTIVITIES)}
        {buildNavbarTab('ABOUT', Route.ABOUT)}
        {session.status === 'authenticated' && session.data.user ? (
          <>
            {buildNavbarTab('SIGN OUT', Route.SIGN_OUT)}
            {buildNavbarTab(
              <>
                ACCOUNT <FontAwesomeIcon icon={faUser} />
              </>,
              Route.ACCOUNT
            )}
          </>
        ) : (
          <>
            {buildNavbarTab('LOGIN', Route.SIGN_IN)}
            {buildNavbarTab('REGISTER', Route.SIGN_UP)}
          </>
        )}
      </nav>
    );
  };

  return (
    <header className={classNames(styles.pageNavbar, { [styles.collapsed]: isHidden })}>
      <Link href={Route.HOME} className={styles.logo}>
        Team.Up
      </Link>
      {buildNavbar()}
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

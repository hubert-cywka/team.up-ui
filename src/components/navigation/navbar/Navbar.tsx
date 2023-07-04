'use client';

import styles from './Navbar.module.scss';
import Link from 'next/link';
import { Route } from 'constants/Route';
import { useScrollDirection } from 'shared/hooks/useScrollPosition';
import AccountMenu from 'components/navigation/navbar/account-menu/AccountMenu';
import classNames from 'classnames';

const SCROLL_THRESHOLD = 25;

const Navbar = () => {
  const scrollDirection = useScrollDirection(SCROLL_THRESHOLD);
  const isCollapsed = scrollDirection === 'down';

  const buildNavbarTab = (name: string, route: string) => {
    return (
      <Link href={route} className={styles.tab}>
        {name}
      </Link>
    );
  };

  return (
    <header className={classNames(styles.pageNavbar, { [styles.collapsed]: isCollapsed })}>
      <Link href={Route.HOME} className={styles.logo}>
        Team.Up
      </Link>
      <nav className={styles.tabsContainer}>
        {buildNavbarTab('HOME', Route.HOME)}
        {buildNavbarTab('ACTIVITIES', Route.ACTIVITIES)}
        {buildNavbarTab('ABOUT', Route.ABOUT)}
      </nav>
      <AccountMenu />
    </header>
  );
};

export default Navbar;

'use client';

import styles from './PageNavbar.module.scss';
import Link from 'next/link';
import { RouteConstants } from 'constants/RouteConstants';
import { useEffect, useState } from 'react';
import { useScrollDirection } from 'utility/hooks/useScrollPosition';
import AccountMenu from 'components/account-menu/AccountMenu';

const SCROLL_THRESHOLD = 25;

const PageNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollDirection = useScrollDirection(SCROLL_THRESHOLD);

  useEffect(() => {
    setIsCollapsed(scrollDirection === 'down');
  }, [scrollDirection]);

  const buildHeaderTab = (name: string, route: string) => {
    return (
      <Link href={route} className={styles.tab}>
        {name}
      </Link>
    );
  };

  return (
    <div className={`${styles.pageNavbar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>Team.Up</div>
      <div className={styles.tabsContainer}>
        {buildHeaderTab('HOME', RouteConstants.HOME)}
        {buildHeaderTab('ACTIVITIES', RouteConstants.ACTIVITIES)}
        {buildHeaderTab('ABOUT', RouteConstants.ABOUT)}
      </div>
      <AccountMenu />
    </div>
  );
};

export default PageNavbar;

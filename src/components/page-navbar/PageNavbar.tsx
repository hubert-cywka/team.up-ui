'use client';

import styles from './PageNavbar.module.scss';
import Link from 'next/link';
import { RouteConstants } from '@/constants/RouteConstants';
import { useEffect, useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollPosition';

const PageNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollDirection = useScrollDirection();

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
    <div
      className={`${styles['page-navbar']} ${
        isCollapsed ? styles['collapsed'] : styles['expanded']
      }`}>
      <div className={styles['logo']}>Team.Up</div>
      <div className={styles['tabs-container']}>
        {buildHeaderTab('HOME', RouteConstants.HOME)}
        {buildHeaderTab('ACTIVITIES', RouteConstants.HOME)}
        {buildHeaderTab('ABOUT', RouteConstants.HOME)}
      </div>
    </div>
  );
};

export default PageNavbar;

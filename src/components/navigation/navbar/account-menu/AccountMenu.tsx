'use client';

import styles from './AccountMenu.module.scss';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { RouteConstants } from 'constants/RouteConstants';
import { useOuterClick } from '../../../../shared/hooks/useOuterClick';
import Link from 'next/link';

const AccountMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const ref = useOuterClick(() => setIsMenuVisible(false));

  const buildMenuItem = (name: string, href: string) => {
    return (
      <Link className={styles.accountMenuItem} href={href}>
        {name}
      </Link>
    );
  };

  return (
    <div className={styles.accountMenuContainer}>
      <FontAwesomeIcon
        className={styles.accountMenuButton}
        icon={faUser}
        onClick={() => setIsMenuVisible(true)}
      />
      {isMenuVisible && (
        <nav className={styles.accountMenu} ref={ref}>
          {buildMenuItem('Sign in', RouteConstants.SIGNIN)}
          {buildMenuItem('Sign up', RouteConstants.SIGNUP)}
        </nav>
      )}
    </div>
  );
};

export default AccountMenu;

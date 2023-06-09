'use client';

import styles from './AccountMenu.module.scss';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RouteConstants } from 'constants/RouteConstants';
import { useOuterClick } from '../../utility/hooks/useOuterClick';

const AccountMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const ref = useOuterClick(() => setIsMenuVisible(false));
  const router = useRouter();

  const buildMenuItem = (name: string, onClick: () => void) => {
    return (
      <div className={styles.accountMenuItem} onClick={onClick}>
        {name}
      </div>
    );
  };

  const navigateTo = (to: string) => {
    router.push(to);
  };

  return (
    <div className={styles.accountMenuContainer}>
      <FontAwesomeIcon
        className={styles.accountMenuButton}
        icon={faUser}
        onClick={() => setIsMenuVisible(true)}
      />
      {isMenuVisible && (
        <div className={styles.accountMenu} ref={ref}>
          {buildMenuItem('Sign in', () => navigateTo(RouteConstants.SIGNIN))}
          {buildMenuItem('Sign up', () => navigateTo(RouteConstants.SIGNUP))}
        </div>
      )}
    </div>
  );
};

export default AccountMenu;

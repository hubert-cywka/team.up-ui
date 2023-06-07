'use client';

import styles from './AccountMenu.module.scss';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import { useRouter } from 'next/router';
import { RouteConstants } from '@/constants/RouteConstants';

const AccountMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

  const buildMenuItem = (name: string, onClick: () => void) => {
    return (
      <div className={styles['account-menu-item']} onClick={onClick}>
        {name}
      </div>
    );
  };

  const navigateTo = (to: string) => {
    router.push(to);
  };

  return (
    <div className={styles['account-menu-container']}>
      <FontAwesomeIcon
        className={styles['account-menu-button']}
        icon={faUser}
        onClick={() => setIsMenuVisible(true)}
      />
      {isMenuVisible && (
        <ClickAwayListener onClickAway={() => setIsMenuVisible(false)}>
          <div className={styles['account-menu']}>
            {buildMenuItem('Sign in', () => navigateTo(RouteConstants.SIGNIN))}
            {buildMenuItem('Sign up', () => navigateTo(RouteConstants.SIGNUP))}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default AccountMenu;

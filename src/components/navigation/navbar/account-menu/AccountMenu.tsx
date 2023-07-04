'use client';

import styles from './AccountMenu.module.scss';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Route } from 'constants/Route';
import { useOuterClick } from '../../../../shared/hooks/useOuterClick';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const AccountMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const ref = useOuterClick(() => setIsMenuVisible(false));
  const session = useSession();

  const buildMenuItem = (name: string, href: string) => {
    return (
      <Link className={styles.accountMenuItem} href={href}>
        {name}
      </Link>
    );
  };

  const buildMenu = () => {
    if (session.status === 'authenticated') {
      return (
        <nav className={styles.accountMenu} ref={ref}>
          <div className={styles.accountMenuItem} onClick={() => signOut({ redirect: false })}>
            Sign out
          </div>
        </nav>
      );
    } else {
      return (
        <nav className={styles.accountMenu} ref={ref}>
          {buildMenuItem('Sign in', Route.SIGNIN)}
          {buildMenuItem('Sign up', Route.SIGNUP)}
        </nav>
      );
    }
  };

  return (
    <div className={styles.accountMenuContainer}>
      <div className={styles.accountButtonContainer} onClick={() => setIsMenuVisible(true)}>
        {session.data?.user && `Hi, ${session.data.user.name}!`}
        <FontAwesomeIcon className={styles.accountButton} icon={faUser} />
      </div>
      {isMenuVisible && buildMenu()}
    </div>
  );
};

export default AccountMenu;

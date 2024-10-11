import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import { EQueryKeys } from '../../types/enums';

import styles from './Header.module.scss';

function Header() {
  const queryClient = useQueryClient();
  const { data: userData } = useQueryCurrUser();

  const onClickHandler = useCallback(() => {
    queryClient.setQueryData(EQueryKeys.CURRENT_USER, { data: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, [queryClient]);

  return (
    <header className={styles['header']}>
      <div className={styles['wrapper']}>
        <h2 className={`h2 ${styles['logo']}`}>Company Dashboard</h2>
        {userData ? (
          <nav className={styles['nav']}>
            <ul className={styles['nav-list']}>
              <li>
                <NavLink className="link p2" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="link p2" to="/companies">
                  Companies
                </NavLink>
              </li>
            </ul>
            <div className={styles['nav-list']}>
              <NavLink className="link p2" to="/profile">
                Profile
              </NavLink>
              <NavLink className="link p2" to="/sign-in" onClick={onClickHandler}>
                Log out
              </NavLink>
            </div>
          </nav>
        ) : (
          <nav className={styles['nav-sign']}>
            <NavLink className="link p2" to="/sign-in">
              Log in
            </NavLink>
            <NavLink className="link p2" to="/sign-up">
              Sign up
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;

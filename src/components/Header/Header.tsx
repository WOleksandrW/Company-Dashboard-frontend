import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

interface IProps {
  isAuth: boolean;
}

function Header({ isAuth }: IProps) {
  return (
    <header className={styles['header']}>
      <div className={styles['wrapper']}>
        <h2 className={`h2 ${styles['logo']}`}>Company Dashboard</h2>
        {isAuth ? (
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
            <NavLink className="link p2" to="/profile">
              Profile
            </NavLink>
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

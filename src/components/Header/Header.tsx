import { useCallback, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useQueryClient } from 'react-query';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import getImageFromBuffer from '../../utils/getImageFromBuffer';
import stringAvatar from '../../utils/stringAvatar';
import { EQueryKeys } from '../../types/enums';

import { IoLogOutOutline, IoPersonCircleSharp } from 'react-icons/io5';

import styles from './Header.module.scss';

function Header() {
  const queryClient = useQueryClient();
  const { data: userData } = useQueryCurrUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const srcImage = useMemo(() => {
    if (userData?.image)
      return getImageFromBuffer(userData.image.data.data, userData.image.mimeType);
  }, [userData]);
  const avatar = useMemo(() => stringAvatar(userData?.username ?? 'A'), [userData?.username]);

  const logOut = useCallback(() => {
    queryClient.setQueryData(EQueryKeys.CURRENT_USER, { data: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAnchorEl(null);
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
            <div>
              <Button
                sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar
                  src={srcImage}
                  alt={userData.username}
                  sx={{ height: '32px', width: '32px', ...avatar.sx }}>
                  {avatar.children}
                </Avatar>
                <Typography className="text-ellipsis" typography="body1">
                  {userData.username}
                </Typography>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}>
                <MenuItem
                  component={NavLink}
                  to="/profile"
                  onClick={() => setAnchorEl(null)}
                  sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IoPersonCircleSharp className="h2" />
                  Profile
                </MenuItem>
                <MenuItem
                  component={NavLink}
                  to="/sign-in"
                  onClick={() => logOut()}
                  sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IoLogOutOutline className="h2" />
                  Logout
                </MenuItem>
              </Menu>
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

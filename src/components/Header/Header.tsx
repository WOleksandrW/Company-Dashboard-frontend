import { useCallback, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useQueryClient } from 'react-query';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import getImageFromBuffer from '../../utils/getImageFromBuffer';
import stringAvatar from '../../utils/stringAvatar';
import { MainDrawerUsage } from '../';
import { EQueryKeys } from '../../types/enums';

import { IoLogOutOutline, IoMenu, IoPersonCircleSharp } from 'react-icons/io5';

import styles from './Header.module.scss';

function Header() {
  const isTablet = useMediaQuery('(max-width: 768px)');

  const queryClient = useQueryClient();
  const { data: userData } = useQueryCurrUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const srcImage = useMemo(() => {
    if (userData?.image)
      return getImageFromBuffer(userData.image.data.data, userData.image.mimeType);
  }, [userData]);
  const avatar = useMemo(() => stringAvatar(userData?.username ?? 'A'), [userData?.username]);

  const logOut = useCallback(() => {
    queryClient.setQueryData(EQueryKeys.CURRENT_USER, { data: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, [queryClient]);

  const authNavigation = useMemo(
    () => [
      { text: 'Home', to: '/' },
      { text: 'Companies', to: '/companies' }
    ],
    []
  );

  const noAuthNavigation = useMemo(
    () => [
      { text: 'Log in', to: '/sign-in' },
      { text: 'Sign up', to: '/sign-up' }
    ],
    []
  );

  const dropDownNavigation = useMemo(
    () => [
      { text: 'Profile', to: '/profile', icon: <IoPersonCircleSharp className="h2" /> },
      { text: 'Logout', to: '/sign-in', icon: <IoLogOutOutline className="h2" />, onClick: logOut }
    ],
    [logOut]
  );

  const drawerNavigation = useMemo(
    () => (userData ? [authNavigation, dropDownNavigation] : [noAuthNavigation]),
    [userData, authNavigation, dropDownNavigation, noAuthNavigation]
  );

  return (
    <header className={styles['header']}>
      <div className={styles['wrapper']}>
        <h2 className={`h2 ${styles['logo']}`}>Company Dashboard</h2>
        {!isTablet ? (
          userData ? (
            <nav className={styles['nav']}>
              <ul className={styles['nav-list']}>
                {authNavigation.map(({ text, to }) => (
                  <li key={text}>
                    <NavLink className="link p2" to={to}>
                      {text}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Box>
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
                  {dropDownNavigation.map(({ text, to, icon, onClick }) => (
                    <MenuItem
                      component={NavLink}
                      to={to}
                      key={text}
                      onClick={() => {
                        if (onClick) onClick();
                        setAnchorEl(null);
                      }}
                      sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {icon}
                      {text}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </nav>
          ) : (
            <nav className={styles['nav-sign']}>
              {noAuthNavigation.map(({ text, to }) => (
                <NavLink key={text} className="link p2" to={to}>
                  {text}
                </NavLink>
              ))}
            </nav>
          )
        ) : (
          <>
            <IconButton size="small" sx={{ typography: 'h2' }} onClick={() => setOpenDrawer(true)}>
              <IoMenu />
            </IconButton>
            <MainDrawerUsage
              open={openDrawer}
              setOpen={setOpenDrawer}
              navigation={drawerNavigation}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

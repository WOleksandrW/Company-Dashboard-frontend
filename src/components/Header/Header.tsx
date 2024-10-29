import { useCallback, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useQueryClient } from 'react-query';
import useQueryCurrUser from '@root/hooks/useQueryCurrUser';
import getImageFromBuffer from '@root/utils/getImageFromBuffer';
import { AvatarUsage, MainDrawerUsage, WrapperBoxUsage } from '../';
import { EQueryKeys } from '@root/enums/queryKeys.enum';
import { ERouterPaths } from '@root/enums/routerPaths.enum';

import { IoLogOutOutline, IoMenu, IoPersonCircleSharp } from 'react-icons/io5';

function Header() {
  const theme = useTheme();
  const isTablet = useMediaQuery('(max-width: 768px)');

  const queryClient = useQueryClient();
  const { data: userData } = useQueryCurrUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const srcImage = useMemo(
    () =>
      userData?.image
        ? getImageFromBuffer(userData.image.data.data, userData.image.mimeType)
        : undefined,
    [userData]
  );

  const logOut = useCallback(() => {
    queryClient.setQueryData(EQueryKeys.CURRENT_USER, { data: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, [queryClient]);

  const authNavigation = useMemo(
    () => [
      { text: 'Home', to: ERouterPaths.HOME },
      { text: 'Companies', to: ERouterPaths.COMPANIES }
    ],
    []
  );

  const noAuthNavigation = useMemo(
    () => [
      { text: 'Log in', to: ERouterPaths.SIGNIN },
      { text: 'Sign up', to: ERouterPaths.SIGNUP }
    ],
    []
  );

  const dropDownNavigation = useMemo(
    () =>
      userData
        ? [
            {
              text: 'Profile',
              to: `${ERouterPaths.PROFILE}/${userData.id}`,
              icon: <Box component={IoPersonCircleSharp} sx={{ typography: 'h2' }} />
            },
            {
              text: 'Logout',
              to: ERouterPaths.SIGNIN,
              icon: <Box component={IoLogOutOutline} sx={{ typography: 'h2' }} />,
              onClick: logOut
            }
          ]
        : [],
    [logOut, userData]
  );

  const drawerNavigation = useMemo(
    () => (userData ? [authNavigation, dropDownNavigation] : [noAuthNavigation]),
    [userData, authNavigation, dropDownNavigation, noAuthNavigation]
  );

  return (
    <Box component="header" sx={{ bgcolor: theme.palette.background.default }}>
      <WrapperBoxUsage
        sx={{
          paddingY: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '40px',
          '@media (max-width: 768px)': {
            columnGap: '20px'
          }
        }}>
        <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
          Company Dashboard
        </Typography>
        {!isTablet ? (
          userData ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '40px',
                width: 'min(700px, 100%)',
                marginLeft: 'auto'
              }}>
              <Box component="ul" sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {authNavigation.map(({ text, to }) => (
                  <Box component="li" key={text}>
                    <Typography component={NavLink} className="link" to={to}>
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box>
                <Button
                  sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <AvatarUsage
                    src={srcImage}
                    title={userData.username}
                    sx={{ height: '32px', width: '32px' }}
                  />
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
            </Box>
          ) : (
            <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {noAuthNavigation.map(({ text, to }) => (
                <Typography component={NavLink} key={text} className="link" to={to}>
                  {text}
                </Typography>
              ))}
            </Box>
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
      </WrapperBoxUsage>
    </Box>
  );
}

export default Header;

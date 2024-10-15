import { useMemo } from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import { BreadcrumbsUsage, TabsUsage } from '../../components';
import { UpdateUserForm, UpdateUserPasswordForm } from './components';
import getImageFromBuffer from '../../utils/getImageFromBuffer';
import stringAvatar from '../../utils/stringAvatar';

import styles from './Profile.module.scss';

function Profile() {
  const { data: userData } = useQueryCurrUser();

  const srcImage = useMemo(() => {
    if (userData?.image)
      return getImageFromBuffer(userData.image.data.data, userData.image.mimeType);
  }, [userData?.image]);
  const avatar = useMemo(() => stringAvatar(userData?.username ?? 'A'), [userData?.username]);

  return (
    <Box className={styles['page']}>
      <BreadcrumbsUsage list={[{ to: '/', text: 'Home' }, { text: 'Profile' }]} />
      {userData && (
        <Box component="section" sx={{ flex: 1, display: 'flex', gap: '20px' }}>
          <Paper
            sx={{
              width: 'min(300px, 100%)',
              alignSelf: 'flex-start',
              padding: '20px',
              borderRadius: '16px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}>
            <Avatar
              src={srcImage}
              alt={userData.username}
              sx={{
                height: '120px',
                width: '120px',
                margin: 'auto',
                fontSize: '10rem',
                marginBottom: '10px',
                ...avatar.sx
              }}>
              {avatar.children}
            </Avatar>
            <Typography variant="h6" align="center">
              {userData.username}
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
              {userData.email}
            </Typography>
          </Paper>

          <Paper sx={{ flex: 1, borderRadius: '16px', padding: '20px' }}>
            <TabsUsage
              tabs={[
                {
                  label: 'Account Info',
                  children: (
                    <Box sx={{ padding: '20px' }}>
                      <Typography variant="body1">
                        Welcome to your profile. Here, you can view and update your personal
                        information.
                      </Typography>
                    </Box>
                  )
                },
                {
                  label: 'Change Data',
                  children: (
                    <Box sx={{ padding: '20px' }}>
                      <UpdateUserForm {...userData} />
                    </Box>
                  )
                },
                {
                  label: 'Change Password',
                  children: (
                    <Box sx={{ padding: '20px' }}>
                      <UpdateUserPasswordForm {...userData} />
                    </Box>
                  )
                }
              ]}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default Profile;

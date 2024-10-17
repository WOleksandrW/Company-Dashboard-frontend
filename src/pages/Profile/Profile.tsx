import { useMemo, useState } from 'react';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import {
  BreadcrumbsUsage,
  MiniDataList,
  PopupChangePasswordUser,
  PopupUpdateUser,
  TabsUsage
} from '../../components';
import getImageFromBuffer from '../../utils/getImageFromBuffer';
import stringAvatar from '../../utils/stringAvatar';
import { EQueryKeys } from '../../types/enums';

import { FaEdit, FaLock } from 'react-icons/fa';

import styles from './Profile.module.scss';

function Profile() {
  const { data: userData, refetch } = useQueryCurrUser();

  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [openPopupChangePass, setOpenPopupChangePass] = useState(false);

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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                marginTop: '20px'
              }}>
              <Button
                variant="contained"
                startIcon={<FaEdit />}
                onClick={() => setOpenPopupUpdate(true)}
                sx={{ typography: 'body2' }}>
                Update data
              </Button>
              <Button
                variant="contained"
                startIcon={<FaLock />}
                onClick={() => setOpenPopupChangePass(true)}
                sx={{ typography: 'body2' }}>
                Change password
              </Button>
            </Box>
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
                      <MiniDataList
                        list={[
                          {
                            subtitle: 'Created at:',
                            value: new Date(userData.createdAt).toLocaleString()
                          },
                          {
                            subtitle: 'Updated at',
                            value: new Date(userData.updatedAt).toLocaleString()
                          }
                        ]}
                      />
                    </Box>
                  )
                }
              ]}
            />
          </Paper>
          <PopupUpdateUser
            open={openPopupUpdate}
            setOpen={setOpenPopupUpdate}
            user={userData}
            queryKey={EQueryKeys.CURRENT_USER}
            onSuccess={() => {
              refetch();
            }}
            toastMessage="Your data was updated successfully!"
            popupTitle="Update your data"
          />
          <PopupChangePasswordUser
            open={openPopupChangePass}
            setOpen={setOpenPopupChangePass}
            userId={userData.id}
            toastMessage="Your password was changed successfully!"
            hasOldPassword
          />
        </Box>
      )}
    </Box>
  );
}

export default Profile;

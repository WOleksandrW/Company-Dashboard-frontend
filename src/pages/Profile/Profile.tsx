import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, Button, Paper, Skeleton, Typography } from '@mui/material';
import api from '@root/api';
import useQueryCurrUser from '@root/hooks/useQueryCurrUser';
import {
  AvatarUsage,
  BreadcrumbsUsage,
  EmptyMessage,
  MiniDataList,
  PopupChangePasswordUser,
  PopupUpdateUser,
  TabsUsage
} from '@root/components';
import getImageFromBuffer from '@root/utils/getImageFromBuffer';
import { EQueryKeys } from '@root/enums/queryKeys.enum';
import { ERole } from '@root/enums/role.enum';

import { FaEdit, FaLock } from 'react-icons/fa';
import { CompaniesTab } from './components';

function Profile() {
  const { id } = useParams();
  const { data: userData } = useQueryCurrUser();

  const { data: user, isLoading } = useQuery(
    [EQueryKeys.USER, { id }],
    () => api.users.getOne(+id!),
    {
      select: ({ data }) => data
    }
  );

  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [openPopupChangePass, setOpenPopupChangePass] = useState(false);

  const srcImage = useMemo(() => {
    if (user?.image) return getImageFromBuffer(user.image.data.data, user.image.mimeType);
  }, [user?.image]);

  const isThisYou = useMemo(() => user && userData && user.id === userData.id, [user, userData]);
  const canEdit = useMemo(() => {
    if (!userData || !user) return false;
    const { role: userRole } = user;
    const { role: currentUserRole } = userData;

    if (currentUserRole === ERole.SUPER) {
      return userRole !== ERole.SUPER;
    }
    if (currentUserRole === ERole.ADMIN) {
      return userRole !== ERole.SUPER && userRole !== ERole.ADMIN;
    }

    return false;
  }, [userData, user]);

  const additionalTabs = useMemo(() => {
    if (user?.role === ERole.USER)
      return [
        {
          label: 'Comanies',
          children: <CompaniesTab user={user} />
        }
      ];

    return [];
  }, [user]);

  if (isLoading)
    return (
      <>
        <Skeleton variant="rounded" sx={{ height: '36px' }} />
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '20px',
            '@media (max-width: 900px)': {
              gridTemplateColumns: '1fr',
              gridTemplateRows: '1fr 3fr'
            }
          }}>
          <Skeleton variant="rounded" sx={{ width: 'min(300px, 100%)', height: '100%' }} />
          <Skeleton variant="rounded" sx={{ flex: 1, height: '100%' }} />
        </Box>
      </>
    );

  if (!user)
    return <EmptyMessage message="User not found" sx={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <>
      <BreadcrumbsUsage
        list={[{ to: '/', text: 'Home' }, { text: `Profile "${user.username}"` }]}
      />
      <Box
        component="section"
        sx={{
          flex: 1,
          display: 'flex',
          gap: '20px',
          '@media (max-width: 900px)': {
            flexDirection: 'column'
          }
        }}>
        <Paper
          sx={{
            width: 'min(300px, 100%)',
            alignSelf: 'flex-start',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            '@media (max-width: 900px)': {
              padding: '12px',
              borderRadius: '12px'
            }
          }}>
          <AvatarUsage
            src={srcImage}
            title={user.username}
            sx={{
              height: '120px',
              width: '120px',
              margin: 'auto',
              fontSize: '10rem',
              marginBottom: '10px'
            }}
          />
          <Typography variant="h6" align="center">
            {user.username}
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary">
            {user.email}
          </Typography>
          {(isThisYou || canEdit) && (
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
          )}
        </Paper>

        <Paper
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            padding: '20px',
            '@media (max-width: 900px)': {
              padding: '12px',
              borderRadius: '12px'
            }
          }}>
          <TabsUsage
            tabs={[
              {
                label: 'Account Info',
                children: (
                  <Box sx={{ padding: '20px', '@media (max-width: 900px)': { padding: '12px' } }}>
                    <Typography variant="body1">
                      {isThisYou
                        ? 'Welcome to your profile. Here, you can view and update your personal information.'
                        : `Welcome to "${user.username}" profile. Here, you can view "${user.username}" personal information.`}
                    </Typography>
                    <MiniDataList
                      list={[
                        {
                          subtitle: 'Created at:',
                          value: new Date(user.createdAt).toLocaleString()
                        },
                        {
                          subtitle: 'Updated at',
                          value: new Date(user.updatedAt).toLocaleString()
                        }
                      ]}
                    />
                  </Box>
                )
              },
              ...additionalTabs
            ]}
          />
        </Paper>
        {(isThisYou || canEdit) && (
          <>
            <PopupUpdateUser
              open={openPopupUpdate}
              setOpen={setOpenPopupUpdate}
              user={user}
              queryKey={EQueryKeys.USER}
              toastMessage={
                isThisYou
                  ? 'Your data was updated successfully!'
                  : `User "${user.username}" data was changed successfully!`
              }
              popupTitle={isThisYou ? 'Update your data' : 'Update User data'}
            />
            <PopupChangePasswordUser
              open={openPopupChangePass}
              setOpen={setOpenPopupChangePass}
              userId={user.id}
              toastMessage={
                isThisYou
                  ? 'Your password was changed successfully!'
                  : `Password of user "${user.username}" changed successfully!`
              }
              hasOldPassword={isThisYou}
            />
          </>
        )}
      </Box>
    </>
  );
}

export default Profile;

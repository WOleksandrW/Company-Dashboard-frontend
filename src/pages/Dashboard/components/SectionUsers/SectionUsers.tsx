import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Button, Pagination, Skeleton, TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import api from '../../../../api';
import { EmptyMessage, GridListUsage, UserCard } from '../../../../components';
import { PopupCreateUser, PopupDeleteUser, PopupChangePasswordUser } from '../';
import { EQueryKeys, ERole } from '../../../../types/enums';
import { TUser } from '../../../../types/TUser';
import { limitRecords } from '../../../../constants/queryParams';

import { FaLock, FaPlus, FaTrashAlt } from 'react-icons/fa';

function SectionUsers() {
  const [searchValue, setSearchValue] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [openPopupCreate, setOpenPopupCreate] = useState(false);
  const [openPopupChangePass, setOpenPopupChangePass] = useState(false);
  const [openPopupDelete, setOpenPopupDelete] = useState(false);

  const [search] = useDebounce(searchValue, 500);

  const { data: response, isLoading } = useQuery(
    [EQueryKeys.USERS_LIST, { page, search, createdAt }],
    () => api.users.getAll({ role: ERole.USER, limit: limitRecords, page, search, createdAt }),
    {
      select: ({ data }) => data
    }
  );

  useEffect(() => setSelectedUser(null), [response?.list]);
  useEffect(() => {
    if (!openPopupDelete) setSelectedUser(null);
  }, [openPopupDelete]);
  useEffect(() => {
    if (!openPopupChangePass) setSelectedUser(null);
  }, [openPopupChangePass]);

  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <TextField
            label="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <TextField
            type="date"
            label="Created at"
            slotProps={{
              inputLabel: {
                shrink: true
              }
            }}
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </Box>
        <Button
          startIcon={<FaPlus />}
          onClick={() => setOpenPopupCreate(true)}
          sx={{ typography: 'body1' }}>
          Create User
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}>
        {isLoading ? (
          <>
            <GridListUsage sx={{ width: '100%', flex: 1 }}>
              {Array(limitRecords)
                .fill(0)
                .map((_, idx) => (
                  <Skeleton key={idx} variant="rounded" sx={{ height: '100%' }} />
                ))}
            </GridListUsage>
            <Skeleton variant="rounded">
              <Pagination count={10} />
            </Skeleton>
          </>
        ) : response?.totalAmount ? (
          <>
            <GridListUsage sx={{ width: '100%' }}>
              {response.list.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  dropDownMenu={[
                    {
                      text: 'Change password',
                      icon: FaLock,
                      callback: () => {
                        setSelectedUser(user);
                        setOpenPopupChangePass(true);
                      }
                    },
                    {
                      text: 'Delete',
                      icon: FaTrashAlt,
                      callback: () => {
                        setSelectedUser(user);
                        setOpenPopupDelete(true);
                      }
                    }
                  ]}
                />
              ))}
            </GridListUsage>
            <Pagination
              count={Math.ceil(response.totalAmount / limitRecords)}
              page={page}
              onChange={(_, page) => setPage(page)}
            />
          </>
        ) : (
          <EmptyMessage sx={{ flex: 1, justifyContent: 'center' }} message="No users data" />
        )}
      </Box>
      <PopupCreateUser
        open={openPopupCreate}
        setOpen={setOpenPopupCreate}
        queryKey={EQueryKeys.USERS_LIST}
        role={ERole.USER}
        toastMessage="User created successfully!"
        popupTitle="Create User"
      />
      {selectedUser && (
        <PopupDeleteUser
          open={openPopupDelete}
          setOpen={setOpenPopupDelete}
          userId={selectedUser.id}
          queryKey={EQueryKeys.USERS_LIST}
          toastMessage={`User "${selectedUser.username}" was deleted successfully!`}
          popupText={`Are you sure you want to delete the user "${selectedUser.username}"`}
        />
      )}
      {selectedUser && (
        <PopupChangePasswordUser
          open={openPopupChangePass}
          setOpen={setOpenPopupChangePass}
          userId={selectedUser.id}
          toastMessage={`Password of user "${selectedUser.username}" changed successfully!`}
        />
      )}
    </Box>
  );
}

export default SectionUsers;

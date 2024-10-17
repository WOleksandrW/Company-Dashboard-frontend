import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Button, Pagination, Skeleton, TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import api from '../../../../api';
import { EmptyMessage, GridListUsage, UserCard } from '../../../../components';
import { PopupCreateUser, PopupDeleteUser, PopupChangePasswordUser, PopupUpdateUser } from '../';
import { EQueryKeys, ERole } from '../../../../types/enums';
import { TUser } from '../../../../types/TUser';
import { limitRecords } from '../../../../constants/queryParams';

import { FaEdit, FaLock, FaPlus, FaTrashAlt } from 'react-icons/fa';

function SectionAdmins() {
  const [searchValue, setSearchValue] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [page, setPage] = useState(1);
  const [selectedAdmin, setSelectedAdmin] = useState<TUser | null>(null);
  const [openPopupCreate, setOpenPopupCreate] = useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [openPopupChangePass, setOpenPopupChangePass] = useState(false);
  const [openPopupDelete, setOpenPopupDelete] = useState(false);

  const [search] = useDebounce(searchValue, 500);

  const { data: response, isLoading } = useQuery(
    [EQueryKeys.ADMINS_LIST, { page, search, createdAt }],
    () => api.users.getAll({ role: ERole.ADMIN, limit: limitRecords, page, search, createdAt }),
    {
      select: ({ data }) => data
    }
  );

  useEffect(() => setSelectedAdmin(null), [response?.list]);
  useEffect(() => {
    if (!openPopupDelete) setSelectedAdmin(null);
  }, [openPopupDelete]);
  useEffect(() => {
    if (!openPopupUpdate) setSelectedAdmin(null);
  }, [openPopupUpdate]);
  useEffect(() => {
    if (!openPopupChangePass) setSelectedAdmin(null);
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
          Create Admin
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
              {response.list.map((admin) => (
                <UserCard
                  key={admin.id}
                  user={admin}
                  dropDownMenu={[
                    {
                      text: 'Update',
                      icon: FaEdit,
                      callback: () => {
                        setSelectedAdmin(admin);
                        setOpenPopupUpdate(true);
                      }
                    },
                    {
                      text: 'Change password',
                      icon: FaLock,
                      callback: () => {
                        setSelectedAdmin(admin);
                        setOpenPopupChangePass(true);
                      }
                    },
                    {
                      text: 'Delete',
                      icon: FaTrashAlt,
                      callback: () => {
                        setSelectedAdmin(admin);
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
          <EmptyMessage sx={{ flex: 1, justifyContent: 'center' }} message="No admins data" />
        )}
      </Box>
      <PopupCreateUser
        open={openPopupCreate}
        setOpen={setOpenPopupCreate}
        queryKey={EQueryKeys.ADMINS_LIST}
        role={ERole.ADMIN}
        toastMessage="Admin created successfully!"
        popupTitle="Create Admin"
      />
      {selectedAdmin && (
        <PopupUpdateUser
          open={openPopupUpdate}
          setOpen={setOpenPopupUpdate}
          user={selectedAdmin}
          queryKey={EQueryKeys.ADMINS_LIST}
          toastMessage={`Admin "${selectedAdmin.username}" data was updated successfully`}
          popupTitle="Update Admin data"
        />
      )}
      {selectedAdmin && (
        <PopupChangePasswordUser
          open={openPopupChangePass}
          setOpen={setOpenPopupChangePass}
          userId={selectedAdmin.id}
          toastMessage={`Password of admin "${selectedAdmin.username}" changed successfully!`}
        />
      )}
      {selectedAdmin && (
        <PopupDeleteUser
          open={openPopupDelete}
          setOpen={setOpenPopupDelete}
          userId={selectedAdmin.id}
          queryKey={EQueryKeys.ADMINS_LIST}
          toastMessage={`Admin "${selectedAdmin.username}" was deleted successfully!`}
          popupText={`Are you sure you want to delete the admin "${selectedAdmin.username}"`}
        />
      )}
    </Box>
  );
}

export default SectionAdmins;

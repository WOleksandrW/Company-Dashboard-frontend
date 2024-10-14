import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Pagination, Skeleton, TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import api from '../../../../api';
import { GridListUsage, UserCard } from '../../../../components';
import { EQueryKeys, ERole } from '../../../../types/enums';

function SectionAdmins() {
  const [searchValue, setSearchValue] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [page, setPage] = useState(1);

  const [search] = useDebounce(searchValue, 500);

  const { data: admins, isLoading } = useQuery(
    [EQueryKeys.ADMINS_LIST, { page, search, createdAt }],
    () => api.users.getAll({ role: ERole.ADMIN, limit: 10, page, search, createdAt }),
    {
      select: ({ data }) => data
    }
  );

  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
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
              {Array(10)
                .fill(0)
                .map((_, idx) => (
                  <Skeleton key={idx} variant="rounded" sx={{ height: '100%' }} />
                ))}
            </GridListUsage>
            <Skeleton variant="rounded">
              <Pagination count={10} />
            </Skeleton>
          </>
        ) : admins?.length ? (
          <>
            <GridListUsage sx={{ width: '100%' }}>
              {admins.map((admin) => (
                <UserCard key={admin.id} user={admin} />
              ))}
            </GridListUsage>
            <Pagination count={10} page={page} onChange={(_, page) => setPage(page)} />
          </>
        ) : (
          <p className="p1">There are no admins</p>
        )}
      </Box>
    </Box>
  );
}

export default SectionAdmins;

import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../../../../api';
import { Box, Button, List, Pagination, Skeleton } from '@mui/material';
import { CompanyCard, EmptyMessage, PopupCreateCompany } from '../../../../components';
import { TUser } from '../../../../types/user.type';
import { EQueryKeys } from '../../../../enums/queryKeys.enum';

import { FaPlus } from 'react-icons/fa';

const limitCompanies = 6;

interface IProps {
  user: TUser;
}

function CompaniesTab({ user }: IProps) {
  const { id: userId } = user;
  const [page, setPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);

  const { data: response, isLoading } = useQuery(
    [EQueryKeys.COMPANIES_LIST, { userId, page }],
    () => api.companies.getAll({ user: userId, limit: limitCompanies, page }),
    { select: ({ data }) => data }
  );

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '20px',
        '@media (max-width: 900px)': { padding: '12px' }
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          startIcon={<FaPlus />}
          onClick={() => setOpenPopup(true)}
          sx={{ typography: 'body1', whiteSpace: 'nowrap' }}>
          Create Company
        </Button>
      </Box>
      {isLoading ? (
        <>
          <Skeleton variant="rounded" sx={{ height: '100%' }} />
          <Skeleton variant="rounded" sx={{ alignSelf: 'center' }}>
            <Pagination count={10} />
          </Skeleton>
        </>
      ) : response?.totalAmount ? (
        <>
          <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              '@media (max-width: 1200px)': {
                maxWidth: '620px',
                marginX: 'auto',
                gridTemplateColumns: 'repeat(2, 1fr)'
              },
              '@media (max-width: 640px)': {
                maxWidth: '320px',
                gridTemplateColumns: 'repeat(1, 1fr)'
              }
            }}>
            {response?.list.map((company) => <CompanyCard key={company.id} company={company} />)}
          </List>
          <Pagination
            count={Math.ceil(response.totalAmount / limitCompanies)}
            page={page}
            onChange={(_, page) => setPage(page)}
            sx={{ alignSelf: 'center' }}
          />
        </>
      ) : (
        <EmptyMessage message="No companies data" sx={{ flex: 1, justifyContent: 'center' }} />
      )}
      <PopupCreateCompany open={openPopup} setOpen={setOpenPopup} userId={userId} />
    </Box>
  );
}

export default CompaniesTab;

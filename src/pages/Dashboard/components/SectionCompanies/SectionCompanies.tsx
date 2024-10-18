import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Pagination, Skeleton, TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import api from '../../../../api';
import { EQueryKeys } from '../../../../enums/queryKeys.enum';
import { CompanyCard, EmptyMessage, GridListUsage } from '../../../../components';
import { limitRecords } from '../../../../constants/queryParams';

function SectionCompanies() {
  const [searchValue, setSearchValue] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [page, setPage] = useState(1);

  const [search] = useDebounce(searchValue, 500);

  const { data: response, isLoading } = useQuery(
    [EQueryKeys.COMPANIES_LIST, { page, search, createdAt }],
    () => api.companies.getAll({ limit: limitRecords, page, search, createdAt }),
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
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          '@media (max-width: 500px)': {
            width: 'min(360px, 100%)',
            flexDirection: 'column',
            alignSelf: 'center'
          }
        }}>
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
              {response.list.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </GridListUsage>
            <Pagination
              count={Math.ceil(response.totalAmount / limitRecords)}
              page={page}
              onChange={(_, page) => setPage(page)}
            />
          </>
        ) : (
          <EmptyMessage sx={{ flex: 1, justifyContent: 'center' }} message="No companies data" />
        )}
      </Box>
    </Box>
  );
}

export default SectionCompanies;

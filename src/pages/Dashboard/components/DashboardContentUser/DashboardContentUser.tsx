import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Divider, Pagination, Skeleton } from '@mui/material';
import api from '../../../../api';
import { CompanyCard, EmptyMessage, GridListUsage, PieChartUsage } from '../../../../components';
import { EQueryKeys } from '../../../../types/enums';
import { limitRecords } from '../../../../constants/queryParams';

function DashboardContentUser() {
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useQuery(
    EQueryKeys.COMPANIES_LIST,
    () => api.companies.getAll(),
    {
      select: ({ data }) => data
    }
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px'
        }}>
        <h2 className="h2 primary-color">Chart of companies by capital</h2>
        {isLoading ? (
          <Skeleton variant="rectangular" sx={{ width: '250px', height: '250px' }} />
        ) : response?.totalAmount ? (
          <Box>
            <PieChartUsage
              data={response.list.map(({ id, capital, title }) => ({
                id,
                value: capital,
                label: title
              }))}
            />
          </Box>
        ) : (
          <EmptyMessage sx={{ flex: 1, justifyContent: 'center' }} message="No companies data" />
        )}
      </Box>
      <Divider />
      <Box
        component="section"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
        <h2 className="h2 primary-color">Your companies:</h2>
        <Box
          sx={{
            flex: 1,
            width: '100%',
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
                {response.list
                  .slice(limitRecords * (page - 1), limitRecords * page)
                  .map((company) => (
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
    </>
  );
}

export default DashboardContentUser;

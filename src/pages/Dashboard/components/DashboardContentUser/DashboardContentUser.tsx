import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Divider, Pagination, Skeleton, Typography } from '@mui/material';
import api from '@root/api';
import { CompanyCard, EmptyMessage, GridListUsage, PieChartUsage } from '@root/components';
import { EQueryKeys } from '@root/enums/queryKeys.enum';
import { limitRecords } from '@root/constants/queryParams';

function DashboardContentUser() {
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useQuery(
    EQueryKeys.COMPANIES_LIST,
    () => api.companies.getAll(),
    {
      select: ({ data }) => data
    }
  );

  const totalCapital = useMemo(
    () =>
      response && response.list.length > 0
        ? response.list.reduce((acc, company) => acc + company.capital, 0)
        : undefined,
    [response?.list]
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Typography variant="h2" className="primary-color" sx={{ fontWeight: 'bold' }}>
            Chart of companies by capital
          </Typography>
          {totalCapital && (
            <Typography className="secondary-color">Total capital = {totalCapital}</Typography>
          )}
        </Box>
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
        <Typography variant="h2" className="primary-color" sx={{ fontWeight: 'bold' }}>
          Your companies:
        </Typography>
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

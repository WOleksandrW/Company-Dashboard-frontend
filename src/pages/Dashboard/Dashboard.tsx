import { Box, Typography } from '@mui/material';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import { ERole } from '../../types/enums';
import { TabsUsage } from '../../components';
import { DashboardContentUser, SectionAdmins, SectionCompanies, SectionUsers } from './components';

function Dashboard() {
  const { data: userData } = useQueryCurrUser();

  return (
    <>
      <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
        <span className="secondary-color">Welcome,</span>{' '}
        <span className="primary-color">{userData!.username}</span>.
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
        {userData!.role === ERole.USER && <DashboardContentUser />}
        {userData!.role === ERole.ADMIN && (
          <TabsUsage
            tabs={[
              { label: 'Users', children: <SectionUsers /> },
              { label: 'Companies', children: <SectionCompanies /> }
            ]}
          />
        )}
        {userData!.role === ERole.SUPER && (
          <TabsUsage
            tabs={[
              { label: 'Admins', children: <SectionAdmins /> },
              { label: 'Users', children: <SectionUsers /> },
              { label: 'Companies', children: <SectionCompanies /> }
            ]}
          />
        )}
      </Box>
    </>
  );
}

export default Dashboard;

import { Box, Typography } from '@mui/material';
import useQueryCurrentUser from '@root/hooks/useQueryCurrentUser';
import { ERole } from '@root/enums/role.enum';
import { TabsUsage } from '@root/components';
import { DashboardContentUser, SectionAdmins, SectionCompanies, SectionUsers } from './components';

function Dashboard() {
  const { data: userData } = useQueryCurrentUser();

  return (
    <>
      <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
        <Typography
          component="span"
          color="secondary"
          sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
          Welcome,
        </Typography>{' '}
        <Typography
          component="span"
          color="primary"
          sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
          {userData!.username}
        </Typography>
        .
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

import { Box } from '@mui/material';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import { ERole } from '../../types/enums';
import { TabsUsage, WrapperBoxUsage } from '../../components';
import { DashboardContentUser, SectionAdmins, SectionCompanies, SectionUsers } from './components';

function Dashboard() {
  const { data: userData } = useQueryCurrUser();

  return (
    <WrapperBoxUsage
      component="section"
      sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1 className="h1">
        <span className="secondary-color">Welcome,</span>{' '}
        <span className="primary-color">{userData!.username}</span>.
      </h1>
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
    </WrapperBoxUsage>
  );
}

export default Dashboard;

import { Fragment, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

interface IProps {
  tabs: {
    label: string;
    children: React.ReactNode;
  }[];
}

function TabsUsage({ tabs }: IProps) {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          sx={{ '@media (max-width: 500px)': { minHeight: 'auto' } }}>
          {tabs.map(({ label }) => (
            <Tab
              sx={{
                typography: 'body1',
                '@media (max-width: 500px)': {
                  padding: '8px 12px',
                  minHeight: 'auto',
                  minWidth: 'auto'
                }
              }}
              key={label}
              label={label}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ label, children }, idx) => (
        <Fragment key={label}>{tab === idx && children}</Fragment>
      ))}
    </>
  );
}

export default TabsUsage;

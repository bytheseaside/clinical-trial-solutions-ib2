import { PropsWithChildren } from 'react';

import { AppRouterPageRoute, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';

interface DashboardsLayoutProps extends AppRouterPageRoute {}

function DashboardsLayout({ children }: DashboardsLayoutProps & PropsWithChildren) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xxs: 20, xl: 30 },
      }}
    >
      {children}
    </Box>
  );
}

export default withPageAuthRequired(
  DashboardsLayout as unknown as AppRouterPageRoute,
  { returnTo: '/dashboard' },
);

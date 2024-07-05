import { PropsWithChildren } from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';

function DashboardsLayout({ children }: PropsWithChildren) {
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
  DashboardsLayout,
  { returnTo: '/dashboard' },
);

import { PropsWithChildren } from 'react';

import Box from '@mui/material/Box';

export default async function DashboardsLayout({ children }: PropsWithChildren) {
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

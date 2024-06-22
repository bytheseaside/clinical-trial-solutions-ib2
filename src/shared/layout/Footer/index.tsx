import React from 'react';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type Props = {
  sx?: SxProps<Theme>;
};

const Footer: React.FC<Props> = ({ sx }) => (
  <Box
    component="footer"
    sx={[
      {
        backgroundColor: 'secondary.main',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box
      sx={{
        width: '10%',
        minWidth: '80px',
        maxWidth: '120px',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'secondary.main',
        }}
      />
    </Box>
    <Typography variant="lead">
      Clinical Trial Solutions
    </Typography>
  </Box>
);

export default Footer;

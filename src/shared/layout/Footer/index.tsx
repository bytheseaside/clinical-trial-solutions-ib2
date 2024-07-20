import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BrandLogo from '../BrandLogo';
import Container from '../Container';

type Props = {
  sx?: React.CSSProperties;
};

const Footer: React.FC<Props> = ({ sx }) => (
  <Box
    sx={{
      borderTop: '1px solid',
      borderColor: 'grey.400',
    }}
  >
    <Container
      component="footer"
      sx={[{
        py: 3,
        color: 'text.secondary',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      },
      ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <BrandLogo sx={{ width: 32, height: 30 }} />
      <Typography variant="caption" display="block" color="text.secondary">
        Clinical Trial Solutions
      </Typography>
    </Container>
  </Box>
);

export default Footer;

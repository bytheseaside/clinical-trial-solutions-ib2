import React from 'react';

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import Container from 'shared/layout/Container';

type Props = {
  staff: { name: string; specialty: string; phone: string }[];
  sx?: SxProps<Theme>;
};

const ContactsBoard: React.FC<Props> = ({ staff, sx = [] }) => (
  <Container
    sx={sx}
  >
    <Typography
      color="text.primary"
      component="h2"
      sx={{ typography: { xxs: 'h4', sm: 'h3' } }}
    >
      Contact us
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        mt: 2,
      }}
    >
      {staff.map(({ name, specialty, phone }) => (
        <Box
          key={name}
          component={Link}
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: 'background.paper',
            p: 2,
            m: 2,
            width: { xxs: '100%', xs: 300 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            textDecoration: 'none',
            color: 'text.primary',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
              textDecoration: 'none',
            },
          }}
        >
          <Typography
            variant="lead"
            sx={{
              mb: 1,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MedicalInformationIcon
              color="primary"
              sx={{ mr: 1 }}
            />
            {name}
          </Typography>
          <Typography variant="caption">{specialty}</Typography>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
            <WhatsAppIcon sx={{ mr: 1 }} />
            {phone}
          </Typography>
        </Box>
      ))}
    </Box>
  </Container>
);

export default ContactsBoard;

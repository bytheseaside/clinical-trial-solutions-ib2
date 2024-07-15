import React from 'react';

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { Contact } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  staff: Contact[];
  sx?: SxProps<Theme>;
};

const ContactsBoard: React.FC<Props> = ({ staff, sx = [] }) => {
  console.log(staff);
  return (
    <Container
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        color="text.primary"
        component="h2"
        sx={{ typography: { xxs: 'h4', sm: 'h3' }, mb: 2 }}
      >
        Contact us
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Need to speak with a physician? Here&apos;s their contact info.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          mt: 3,
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
              px: 2,
              py: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              borderRadius: 1,
              boxShadow: 3,
              width: { xxs: '100%', sm: '40%', md: '30%' },
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
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 1,
                pb: 1,
                borderBottom: '1px solid',
                borderColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <MedicalInformationIcon
                color="primary"
                sx={{ mr: 1 }}
              />
              {specialty}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ mb: 1, typography: { xxs: 'captionSmall', sm: 'caption' } }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <WhatsAppIcon sx={{ mr: 1 }} />
              {phone}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ContactsBoard;

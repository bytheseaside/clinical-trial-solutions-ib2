import React from 'react';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Appointment } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  appointments: Appointment[];
  sx?: SxProps<Theme>;
};

const AppointmentsSection: React.FC<Props> = ({ appointments, sx = [] }) => {
  if (!Array.isArray(appointments) || appointments.length === 0) {
    return null;
  }

  return (
    <Container
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Typography color="text.primary" sx={{ typography: { xxs: 'h4', sm: 'h3' }, mb: 3 }}>
        Next appointments
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Check when are you scheduled.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {appointments.map(({ study, date }) => {
          const appointmentDate = new Date(date);
          const today = new Date().setHours(0, 0, 0, 0);
          if (appointmentDate.setHours(0, 0, 0, 0) < today) return null;
          const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December',
          ];
          const formattedDate = appointmentDate.getDate();
          const formattedMonth = monthNames[appointmentDate.getMonth()].slice(0, 3);
          const formattedHour = new Date(date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

          return (
            <Box
              key={`${study.name}-${new Date(date).toISOString()}`}
              sx={{
                display: 'flex',
                boxShadow: 4,
                borderRadius: 1,
                backgroundColor: 'background.paper',
                p: 2,
                mt: 2,
                borderLeft: '6px solid',
                borderColor: 'primary.main',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  m: 2,
                  p: 1,
                  backgroundColor: 'primary.light',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                }}
              >
                <Typography
                  sx={{
                    typography: { xxs: 'h6', sm: 'h5' },
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                  }}
                >
                  {formattedDate}
                </Typography>
                <Typography
                  sx={{
                    typography: { xxs: 'caption', sm: 'body2' },
                    color: 'primary.contrastText',
                  }}
                >
                  {formattedMonth}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  ml: 2,
                }}
              >
                <Typography
                  sx={{ typography: { xxs: 'body2', sm: 'body1' }, color: 'text.primary' }}
                >
                  {study.name}
                </Typography>
                <Typography
                  sx={{ typography: { xxs: 'caption', sm: 'body2' }, color: 'text.secondary' }}
                >
                  {formattedHour}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default AppointmentsSection;

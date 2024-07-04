import React from 'react';

import AlarmIcon from '@mui/icons-material/Alarm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Container from 'shared/layout/Container';

type Props = {
  steps: { title: string; status: 'toDo' | 'inProgress' | 'done' }[];
  sx?: SxProps<Theme>;
};

const getStatusText = (status: 'toDo' | 'inProgress' | 'done'): string => {
  switch (status) {
    case 'toDo':
      return 'To Do';
    case 'inProgress':
      return 'In Progress';
    case 'done':
      return 'Done';
    default:
      return '';
  }
};

const TrialProgress: React.FC<Props> = ({ steps, sx = {} }) => (
  <Container
    component="header"
    sx={[
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Typography
      color="text.primary"
      sx={{ typography: { xxs: 'h4', sm: 'h3' }, mb: 3 }}
    >
      Progress
    </Typography>
    <Box>
      {steps.map(({ title, status }) => (
        <Box
          key={title + status}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            p: 2,
            mt: 2,
            borderRadius: 1,
            borderLeft: '6px solid',
            borderColor: status === 'toDo' ? 'error.main' : status === 'inProgress' ? 'warning.main' : 'success.main',
            boxShadow: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: status === 'toDo' ? 'error.light' : status === 'inProgress' ? 'warning.light' : 'success.light',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              marginRight: 2,
            }}
          >
            {status === 'toDo' && <AlarmIcon color="error" sx={{ fontSize: '2.5rem' }} />}
            {status === 'inProgress' && <HourglassEmptyIcon color="warning" sx={{ fontSize: '2.5rem' }} />}
            {status === 'done' && <CheckCircleIcon color="success" sx={{ fontSize: '2.5rem' }} />}
          </Box>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Typography
              sx={{
                typography: { xxs: 'body2', sm: 'body1' },
                color: 'text.primary',
                mb: 0.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                typography: { xxs: 'caption', sm: 'caption' },
                color: 'text.secondary',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {getStatusText(status)}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Container>
);

export default TrialProgress;

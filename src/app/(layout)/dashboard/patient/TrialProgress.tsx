import React from 'react';

import AlarmIcon from '@mui/icons-material/Alarm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Appointment } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  steps: Appointment[];
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

const getStatusFromDate = (date: Date): 'toDo' | 'inProgress' | 'done' => {
  const now = new Date();

  // Normalize the current date to the start of today
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));

  // Define end of today as the start of the next day
  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(startOfToday.getDate() + 1);

  // Normalize the input date to remove the time part
  const inputDate = new Date(date);
  const startOfInputDate = new Date(inputDate.setHours(0, 0, 0, 0));

  // Determine the status based on the normalized date
  if (startOfInputDate < startOfToday) {
    return 'done'; // Date is before the start of today
  }
  if (startOfInputDate >= startOfToday && startOfInputDate < endOfToday) {
    return 'inProgress'; // Date is between start and end of today
  }
  return 'toDo'; // Date is after the end of today
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
    <Typography variant="caption" color="text.secondary">
      Here, you can check which steps you&apos;ve completed and
      which ones you still need to go through.
    </Typography>
    <Box
      sx={{ mt: 3 }}
    >
      {steps.map(({ study, date }) => (
        <Box
          key={study.name + new Date(date).toDateString()}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            p: 2,
            mt: 2,
            borderRadius: 1,
            borderLeft: '6px solid',
            borderColor: getStatusFromDate(date) === 'toDo' ? 'error.main' : getStatusFromDate(date) === 'inProgress' ? 'warning.main' : 'success.main',
            boxShadow: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: getStatusFromDate(date) === 'toDo' ? 'error.light' : getStatusFromDate(date) === 'inProgress' ? 'warning.light' : 'success.light',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              marginRight: 2,
            }}
          >
            {getStatusFromDate(date) === 'toDo' && <AlarmIcon color="error" sx={{ fontSize: '2.5rem' }} />}
            {getStatusFromDate(date) === 'inProgress' && <HourglassEmptyIcon color="warning" sx={{ fontSize: '2.5rem' }} />}
            {getStatusFromDate(date) === 'done' && <CheckCircleIcon color="success" sx={{ fontSize: '2.5rem' }} />}
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
              {study.name}
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
              {getStatusText(getStatusFromDate(date))}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Container>
);

export default TrialProgress;

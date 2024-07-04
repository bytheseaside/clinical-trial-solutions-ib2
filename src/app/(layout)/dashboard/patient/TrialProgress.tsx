import React from 'react';

import AdjustIcon from '@mui/icons-material/Adjust';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/system';

import Container from 'shared/layout/Container';

type Props = {
  steps: { title: string; status: 'toDo' | 'inProgress' | 'done' }[];
  sx?: SxProps<Theme>;
};

const TrialProgress: React.FC<Props> = ({ steps, sx = [] }) => (
  <Container
    component="header"
    sx={[
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Typography
      color="text.primary"
      sx={{ typography: { xxs: 'h4', sm: 'h3' }, mb: 2 }}
    >
      Progress
    </Typography>
    <Box>
      {steps.map(({ title, status }) => (
        <Box
          key={title + status}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            px: 2,
            py: 2,
            mt: 2,
            boxShadow: 4,
            borderRadius: 1,
          }}
        >
          {status === 'toDo' && (
            <AdjustIcon color="error" />
          )}
          {status === 'inProgress' && (
            <AssignmentLateIcon color="warning" />
          )}
          {status === 'done' && (
            <OfflinePinIcon color="success" />
          )}
          <Typography
            sx={{
              ml: 3,
              mr: 3,
              overflow: 'hidden',
              typography: { xxs: 'captionSmall', sm: 'caption' },
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
        </Box>
      ))}
    </Box>
  </Container>
);

export default TrialProgress;

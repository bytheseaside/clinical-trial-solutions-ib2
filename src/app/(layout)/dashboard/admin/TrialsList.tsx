'use client';

import React from 'react';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import LocalHospital from '@mui/icons-material/LocalHospital';
import People from '@mui/icons-material/People';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ClinicalTrial } from 'shared/api';
import Container from 'shared/layout/Container';

const renderIcon = (key: string) => {
  switch (key) {
    case 'analyst':
      return <AssignmentInd color="secondary" sx={{ mr: 1 }} />;
    default:
      return <People color="secondary" sx={{ mr: 1 }} />;
  }
};

const renderLabel = (key: string) => {
  switch (key) {
    case 'analyst':
      return 'Analyst';
    default:
      return `Patient (${key.split('-')[1] || 'General'})`;
  }
};
type Props = {
  trials: ClinicalTrial[];
  medicalStaffCode: string;
  sx?: SxProps<Theme>;
};

const TrialsList: React.FC<Props> = ({ trials, medicalStaffCode, sx = [] }) => {
  const [expanded, setExpanded] = React.useState<string>('');

  const handlePanelChange = (panel: string) =>
    (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : '');
    };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...(Array.isArray(sx) ? sx : [sx]),
      }}
    >
      <Typography
        color="text.primary"
        sx={{
          typography: { xxs: 'h4', sm: 'h3' },
          mb: 3,
        }}
      >
        Existent Clinical Trials
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        See the list of clinical trials that are currently active and their respective
        sign up codes to give.
      </Typography>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <LocalHospital color="secondary" sx={{ mr: 1 }} />
          {' '}
          <Typography variant="body2">
            All
            {' '}
            <Typography
              component="span"
              variant="inherit"
              sx={{ fontWeight: 'bold' }}
            >
              Medical Staff
            </Typography>
            {' '}
            from the clinic can use the same code:
            {' '}
            {medicalStaffCode}
          </Typography>
        </Box>
        {trials.map((trial) => (
          <Accordion
            key={trial.id}
            disableGutters
            elevation={0}
            square
            expanded={expanded === trial.id}
            onChange={handlePanelChange(trial.id)}
            sx={(theme) => (
              {
                border: `1px solid ${theme.palette.divider}`,
                '&:not(:last-child)': {
                  borderBottom: 0,
                },
                '&::before': {
                  display: 'none',
                },
              }
            )}
          >
            <AccordionSummary
              aria-controls={`${trial.id}-content`}
              id={`${trial.id}-header`}
              expandIcon={<ArrowForwardIosSharpIcon fontSize="inherit" />}
              sx={{
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                  transform: 'rotate(90deg)',
                },
                '& .MuiAccordionSummary-content': {
                  marginLeft: 1,
                },
              }}
            >
              Id:
              {' '}
              {trial.id}
              {' '}
              -
              {' '}
              {trial.name}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                p: 2,
                borderTop: '1px solid rgba(0, 0, 0, .125)',
              }}
            >
              {Object.entries(trial.signUpCodes).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  {renderIcon(key)}
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {renderLabel(key)}
                    :
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default TrialsList;

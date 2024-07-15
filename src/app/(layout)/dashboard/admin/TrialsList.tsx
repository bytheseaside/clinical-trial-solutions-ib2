'use client';

import React from 'react';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Accordion } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ClinicalTrial } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  trials: ClinicalTrial[];
  sx?: SxProps<Theme>;
};

const TrialsList: React.FC<Props> = ({ trials, sx = [] }) => {
  const [expanded, setExpanded] = React.useState<string>('');

  const handlePanelChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
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
              aca van los codigos
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default TrialsList;

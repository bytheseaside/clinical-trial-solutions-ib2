'use client';

import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ClinicalTrialService from 'services/firebase/clinicalTrialService';

import { ClinicalTrial, Contact } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  trials: ClinicalTrial[];
  sx?: SxProps<Theme>;
};

const ContactInfo: React.FC<Props> = ({ trials, sx = [] }) => {
  const [selectedTrial, setSelectedTrial] = React.useState<ClinicalTrial | null>(null);
  const [contact, setContact] = React.useState<Contact>({
    name: '',
    phone: '',
    specialty: '',
  });

  const handleTrialChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const trial = trials.find((t) => t.id === event.target.value);
    if (trial) {
      setSelectedTrial(trial);
    }
  };

  const handleContactChange = (field: keyof Contact) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setContact({
        ...contact,
        [field]: event.target.value,
      });
    };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTrial?.id) {
      try {
        await ClinicalTrialService.updateTrialContactInfo(selectedTrial.id, contact);
        console.log('Contact info submitted successfully');
        setContact({
          name: '',
          phone: '',
          specialty: '',
        });
      } catch (error) {
        console.error('Error submitting contact info:', error);
      }
    }
  };

  return (
    <Container
      sx={{
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
        Clinical trial contact information
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Add here the contact information for the clinical trial for the users to reach out
        in an emergency situation.
      </Typography>
      <Box>
        <TextField
          select
          size="small"
          label="Select Clinical Trial"
          value={selectedTrial?.id || ''}
          onChange={handleTrialChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled dense>
            Select
          </MenuItem>
          {Array.isArray(trials)
            && trials.length > 0
            && trials.map((trial) => (
              <MenuItem key={trial.id} value={trial.id} dense>
                {trial.name}
              </MenuItem>
            ))}
        </TextField>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xxs: 'column', sm: 'row' },
              gap: 2,
            }}
          >
            <TextField
              size="small"
              label="Doctor Name"
              value={contact.name}
              onChange={handleContactChange('name')}
              fullWidth
              required
              disabled={!selectedTrial?.id}
            />
            <TextField
              size="small"
              label="Phone Number"
              value={contact.phone}
              onChange={handleContactChange('phone')}
              fullWidth
              required
              disabled={!selectedTrial?.id}
            />
            <TextField
              size="small"
              label="Specialty"
              value={contact.specialty}
              onChange={handleContactChange('specialty')}
              fullWidth
              required
              disabled={!selectedTrial?.id}
            />
          </Box>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="small"
            sx={{ alignSelf: 'flex-end', mt: 2, backgroundColor: 'transparent' }}
            disabled={!selectedTrial?.id}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactInfo;

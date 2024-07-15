'use client';

import React from 'react';

import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type Props = {
  error: boolean;
  setError: (value:boolean) => void;
  setCode: (value: string) => void;
  usertype: 'patient' | 'medicalStaff' | 'analyst' | '';
  sx?: SxProps<Theme>;
};

const GetSignUpCode: React.FC<Props> = ({ error, setError, setCode, usertype, sx = [] }) => {
  const [internalCode, setInternalCode] = React.useState<string>('');

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalCode(e.target.value || '');
    setError(false);
  };

  const handleSubmission = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (internalCode === '') {
      setError(true);
      return;
    }
    setCode(internalCode);
  };

  return (
    <Box
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Typography color="text.primary" sx={{ typography: { xxs: 'h4', sm: 'h3' }, mb: 3 }}>
        Sign up code
      </Typography>
      <Typography variant="caption" color="text.secondary">
        The clinic should&apos;ve gave you a code. You need to input it here.
        After this, you&apos;ll be shown the next steps for you.
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
        }}
        onSubmit={handleSubmission}
      >
        <TextField
          disabled={!!usertype}
          id="trialId"
          name="trialId"
          required
          onChange={handleCodeChange}
          label="Registration code"
          variant="outlined"
          helperText={
            error
              ? 'There was an error, try again'
              : ''
          }
          error={error}
          value={internalCode}
          size="small"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          sx={{ alignSelf: 'flex-end' }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default GetSignUpCode;

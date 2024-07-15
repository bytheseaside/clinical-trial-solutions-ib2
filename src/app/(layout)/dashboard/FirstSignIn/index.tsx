'use client';

import React, { useEffect, useState } from 'react';

import { SxProps, Theme } from '@mui/material/styles';

import { ClinicalTrial } from 'shared/api';
import Container from 'shared/layout/Container';

import GetSignUpCode from './GetSignUpCode';
import PatientForm from './PatientForm';

type Props = {
  sx?: SxProps<Theme>;
};

const FirstSignIn: React.FC<Props> = ({ sx = [] }) => {
  const [error, setError] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [relatedTrial, setRelatedTrial] = useState<ClinicalTrial | null>(null);
  const [usertype, setUsertype] = useState<'patient' | 'medicalStaff' | 'analyst' | ''>('');
  const [group, setGroup] = useState<string>('');

  console.log(error, code);

  useEffect(() => {
    if (code) {
      // ClinicalTrial.getTrialByCode(code)
      //   .then((response) => {
      //     setRelatedTrial(response.data);
      //   })
      //   .catch(() => {
      //     setError(true);
      //   });

      const foundGeneralMedicalStaffCode = 'AN-TR1-001'; // TODO replace with actual call to DB to get this code
      if (code === foundGeneralMedicalStaffCode) {
        setUsertype('medicalStaff');
        return;
      }

      const foundClinicalTrial: ClinicalTrial = {
        id: 'trial1',
        name: 'Trial 1',
        studies: [
          {
            name: 'Study A1',
            keyVariables: [
              { name: 'Variable 1', type: 'boolean' },
              { name: 'Variable 2', type: 'number' },
            ],
          },
          {
            name: 'Study B1',
            keyVariables: [
              { name: 'Variable 3', type: 'text' },
              { name: 'Variable 4', type: 'threshold' },
            ],
          },
        ],
        contacts: [],
        signUpCodes: {
          analyst: 'AN-TR1-001',
          patient: 'PT-TR1-001',
        },
      }; // TODO replace with actual call to DB

      const foundUsertype = Object.keys(
        foundClinicalTrial.signUpCodes,
      ).find((key) => foundClinicalTrial.signUpCodes[key] === code);
      if (!foundUsertype) {
        setError(true);
        return;
      }
      setUsertype(foundUsertype.split('-')[0]);
      setGroup(foundUsertype.split('-')[1] || '');

      setRelatedTrial(foundClinicalTrial);
    }
  }, [code]);

  useEffect(() => {
    if (usertype === 'analyst' || usertype === 'medicalStaff') {
      // registrarlos como usuario en firebase
    }
  }, [usertype]);

  return (
    <Container
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      {(!relatedTrial || error)
        && (
          <GetSignUpCode
            error={error}
            setError={setError}
            setCode={setCode}
            usertype={usertype}
          />
        )}
      {/* {relatedTrial && !error && usertype === 'patient' && ( */}
      {( // some comment
        <PatientForm />
      )}
    </Container>
  );
};

export default FirstSignIn;

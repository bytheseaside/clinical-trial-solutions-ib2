'use client';

import React, { useEffect, useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';
import { SxProps, Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import ClinicalTrialService from 'services/firebase/clinicalTrialService';
import CodeService from 'services/firebase/codeService';
import UserService from 'services/firebase/userService';

import { ClinicalTrial } from 'shared/api';
import Container from 'shared/layout/Container';

import GetSignUpCode from './GetSignUpCode';
import PatientForm from './PatientForm';

type Props = {
  sx?: SxProps<Theme>;
};

const FirstSignIn: React.FC<Props> = ({ sx = [] }) => {
  const { user } = useUser();
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [relatedTrial, setRelatedTrial] = useState<ClinicalTrial | null>(null);
  const [usertype, setUsertype] = useState<'patient' | 'medicalStaff' | 'analyst' | ''>('');
  const [group, setGroup] = useState<string>('');

  useEffect(() => {
    const fetchTrialData = async () => {
      if (code) {
        try {
          // Check if code corresponds to medical staff
          const medicalStaffCode = await CodeService.getMedicalStaffCode();
          if (code === medicalStaffCode) {
            setUsertype('medicalStaff');
            return;
          }

          // Fetch all trials and find the matching trial
          const trials: ClinicalTrial[] = await ClinicalTrialService.getAllTrials();
          const foundTrial = trials.find((trial) =>
            Object.values(trial.signUpCodes).includes(code));

          if (!foundTrial) {
            setError(true);
            return;
          }

          // Determine usertype and group based on sign-up codes
          const foundUsertype = Object.keys(foundTrial.signUpCodes).find(
            (key) => foundTrial.signUpCodes[key] === code,
          );

          if (!foundUsertype) {
            setError(true);
            return;
          }

          setUsertype(foundUsertype.split('-')[0] as 'patient' | 'medicalStaff' | 'analyst');
          setGroup(foundUsertype.split('-')[1] || '');

          setRelatedTrial(foundTrial);
        } catch (fetchError) {
          // eslint-disable-next-line no-console
          console.error('Error fetching trials:', fetchError);
          setError(true);
        }
      }
    };

    fetchTrialData();
  }, [code]);

  useEffect(() => {
    if (usertype === 'medicalStaff' && user?.sub && user?.email) {
      const baseUser = {
        usertype,
        mail: user.email,
        id: user.sub,
      };
      UserService.createUser(user.sub, baseUser)
        .then(() => router.push('/dashboard/medical-staff'));
    }
    if ((usertype === 'analyst') && user?.sub && user?.email && relatedTrial) {
      const baseUser = {
        usertype,
        mail: user.email,
        id: user.sub,
        trialId: relatedTrial.id,
      };
      UserService.createUser(user.sub, baseUser)
        .then(() => router.push('/dashboard/analyst'));
    }
  }, [usertype]);

  return (
    <Container
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      {(!relatedTrial || error) && (
        <GetSignUpCode
          error={error}
          setError={setError}
          setCode={setCode}
          usertype={usertype}
        />
      )}
      {relatedTrial && !error && usertype === 'patient' && (
        <PatientForm
          trial={relatedTrial}
          group={group}
        />
      )}
    </Container>
  );
};

export default FirstSignIn;

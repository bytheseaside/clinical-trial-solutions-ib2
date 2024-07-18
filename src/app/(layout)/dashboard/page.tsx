'use client';

import { useEffect, useState } from 'react';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import UserService from 'services/firebase/userService';

import Container from 'shared/layout/Container';

import FirstSignIn from './components/FirstSignIn';
import Header from './Header';

const USER_TYPE_PAGES: { [key: string]: string } = {
  patient: 'patient',
  medicalStaff: 'medical-staff',
  analyst: 'analyst',
  admin: 'admin',
};

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.sub) {
        const auxUser = await UserService.getUserById(user.sub);
        if (auxUser) {
          const userTypePage = USER_TYPE_PAGES[auxUser.usertype];
          if (userTypePage) {
            router.push(`/dashboard/${userTypePage}`);
          } else {
            // eslint-disable-next-line no-console
            console.error('Unknown user type:', auxUser.usertype);
            setIsFirstSignIn(true);
          }
        } else {
          setIsFirstSignIn(true);
        }
      }
    };
    fetchUser();
  }, [user]);

  return (
    <>
      <Header />
      {!isFirstSignIn && (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          LOADING, PLEASE WAIT...
        </Container>
      )}
      {isFirstSignIn && <FirstSignIn />}
    </>
  );
}

export default withPageAuthRequired(Dashboard);

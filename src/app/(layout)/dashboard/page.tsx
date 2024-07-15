'use client';

import { useEffect, useState } from 'react';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import UserService from 'services/firebase/userService';

import FirstSignIn from './FirstSignIn';
import Header from './Header';

const USER_TYPE_PAGES = {
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
          router.push(`/dashboard/${USER_TYPE_PAGES[auxUser.usertype]}`);
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
      {isFirstSignIn && <FirstSignIn />}
    </>
  );
}

export default withPageAuthRequired(Dashboard);

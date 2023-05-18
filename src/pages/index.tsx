import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Seo } from 'src/components/seo';
import CountDownTimer from 'src/sections/home/countdown-timer';
import ParticipantList from 'src/sections/home/participant-list';
import { getAuthData } from 'src/slices/auth';
import { useSelector } from 'src/store';
import type { Page as PageType } from 'src/types/page';

const Page: PageType = () => {
  const authData = useSelector(getAuthData);
  const router = useRouter();

  useEffect(() => {
    if (!authData.authToken || !authData.userId) {
      router.push('/login');
    }
  }, [authData, router]);

  return (
    <>
      <Seo title="Management" />
      <Box
        component="main"
        minHeight="100vh"
      >
        <Box>
          <CountDownTimer />
        </Box>
        <ParticipantList />
      </Box>
    </>
  );
};

export default Page;

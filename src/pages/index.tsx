import { Box, Button, Stack, TextField } from '@mui/material';
import { Seo } from 'src/components/seo';
import SettingDialog from 'src/components/setting-dialog';
import type { Page as PageType } from 'src/types/page';

const Page: PageType = () => {
  return (
    <>
      <Seo />
      <Box component="main">
        <Stack></Stack>
      </Box>
      <SettingDialog />
    </>
  );
};

export default Page;

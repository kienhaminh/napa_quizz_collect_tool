import { Box, Typography, Grid } from '@mui/material';
import { Seo } from 'src/components/seo';
import ParticipantList from 'src/sections/home/participant-list';
import SettingDialog from 'src/sections/home/setting-dialog';
import { getTeamInfo, setTeamInfo } from 'src/slices/game';
import { useDispatch, useSelector } from 'src/store';
import type { Page as PageType } from 'src/types/page';
import { ITeamInfo } from 'src/types/team';

const Page: PageType = () => {
  const dispatch = useDispatch();
  const teamInfo = useSelector(getTeamInfo);

  const onSubmitTeamInfo = (teamInfo: ITeamInfo) => {
    dispatch(setTeamInfo(teamInfo));
  };

  return (
    <>
      <Seo title="Management" />
      <Box
        component="main"
        minHeight="100vh"
      >
        <ParticipantList />
      </Box>
    </>
  );
};

export default Page;

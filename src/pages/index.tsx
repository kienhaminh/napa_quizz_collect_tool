import { Box, Typography, Grid } from '@mui/material';
import { Seo } from 'src/components/seo';
import ParticipantList from 'src/sections/home/participant-list';
import QuestionList from 'src/sections/home/question-list';
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
        <Box p={2}>
          <Typography variant="h6">Room Name:</Typography>
          <Typography>{teamInfo?.name || '--'}</Typography>
        </Box>
        <Grid
          container
          height="100%"
        >
          <Grid
            item
            xs={3}
          >
            <QuestionList />
          </Grid>
          <Grid
            item
            xs={9}
          >
            <ParticipantList />
          </Grid>
        </Grid>
      </Box>
      {!teamInfo && <SettingDialog onSubmit={onSubmitTeamInfo} />}
    </>
  );
};

export default Page;

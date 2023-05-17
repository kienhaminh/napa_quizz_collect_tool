import { Box, Grid } from '@mui/material';
import ParticipantCard from './participant-card';
import { useSelector } from 'src/store';
import { getParticipant } from 'src/slices/participant';
import { FileDropzone } from 'src/components/file-dropzone';

const ParticipantList = () => {
  const participants = useSelector(getParticipant);

  if (!Array.isArray(participants) || participants.length === 0) {
    return (
      <Box p={2}>
        <FileDropzone caption="Participants list" />
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={1}
      p={1}
    >
      <Grid
        item
        xs={3}
      >
        <ParticipantCard
          data={{
            username: 'kien.ha',
            name: 'Ha Minh Kien',
            active: true,
          }}
          answer="aaaaaaaaaa"
        />
      </Grid>
    </Grid>
  );
};

export default ParticipantList;

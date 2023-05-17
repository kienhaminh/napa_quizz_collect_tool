import { Card, Typography, Stack } from '@mui/material';
import { IParticipant } from 'src/types/participant';

interface Props {
  data: IParticipant;
  answer: string;
}

const ParticipantCard = ({ data, answer }: Props) => {
  return (
    <Card>
      <Stack
        p={2}
        spacing={1}
      >
        <Typography variant="h6">{data.name}</Typography>
        <Typography>Answer: {answer}</Typography>
      </Stack>
    </Card>
  );
};

export default ParticipantCard;

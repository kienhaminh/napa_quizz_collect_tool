import { Card, Typography, Stack, Button } from '@mui/material';
import { setParticipantDetail } from 'src/slices/participant';
import { useDispatch } from 'src/store';
import { IParticipant } from 'src/types/participant';

interface Props {
  data: IParticipant;
  answer: string;
}

const ParticipantCard = ({ data, answer }: Props) => {
  const dispatch = useDispatch();
  const active = data.active;

  const onOut = () => {
    dispatch(setParticipantDetail({ ...data, active: false }));
  };

  const onComeback = () => {
    dispatch(setParticipantDetail({ ...data, active: true }));
  };

  return (
    <Card>
      <Stack
        p={2}
        direction="row"
        justifyContent="space-between"
      >
        <Stack
          spacing={1}
          pr={2}
          sx={{ opacity: data.active ? 1 : 0.4 }}
        >
          <Typography variant="h6">{data.name}</Typography>
          <Typography>Answer: {answer}</Typography>
        </Stack>
        <div>
          {active ? (
            <Button
              variant="contained"
              color="error"
              onClick={onOut}
            >
              Out
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={onComeback}
            >
              Comeback
            </Button>
          )}
        </div>
      </Stack>
    </Card>
  );
};

export default ParticipantCard;

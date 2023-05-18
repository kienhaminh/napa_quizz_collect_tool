import { useState, useMemo } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import ParticipantCard from './participant-card';
import { useDispatch, useSelector } from 'src/store';
import { getParticipants, setParticipant } from 'src/slices/participant';
import { FileDropzone } from 'src/components/file-dropzone';
import Papa from 'papaparse';
import { getRooms } from 'src/api/request';
import { LoadingButton } from '@mui/lab';
import { useLoading } from 'src/hooks/use-loading';

interface Answer {
  username: string;
  answer: string;
}

const ParticipantList = () => {
  const dispatch = useDispatch();
  const participants = useSelector(getParticipants);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { loading, toggle } = useLoading();

  const clearParticipants = () => {
    dispatch(setParticipant([]));
  };

  const handleParticipantData = (file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        if (results.data) {
          const data = results.data
            .filter((item: any) => item.length === 2 && item[1].includes('.'))
            .map((item: any) => {
              return {
                name: item[0].trim(),
                username: item[1].trim(),
                active: true,
              };
            });
          dispatch(setParticipant(data));
        }
      },
    });
  };

  const getAnswer = async () => {
    if (Array.isArray(participants) && participants.length > 0) {
      (async () => {
        try {
          toggle();
          const res = await getRooms();
          if (res && res.length > 0) {
            const answer = res
              .filter(
                (item) =>
                  Array.isArray(item.usernames) &&
                  item.usernames.length === 2 &&
                  participants.findIndex((participant) => {
                    if (
                      !Array.isArray(item.usernames) ||
                      item.usernames.length < 2
                    ) {
                      return false;
                    }
                    return (
                      item.usernames[0] === participant.username ||
                      item.usernames[1] === participant.username
                    );
                  }) > -1
              )
              .map((item) => {
                return {
                  username: item.usernames
                    ? item.usernames.find(
                        (username) => username !== 'kien.ha'
                      ) || ''
                    : '',
                  answer: item.lastMessage ? item.lastMessage.msg : '',
                };
              });
            setAnswers(answer);
          }
          toggle();
        } catch (err) {
          console.log(err);
          toggle();
        }
      })();
    }
  };

  const renderedParticipants = useMemo(() => {
    if (!Array.isArray(participants) || participants.length === 0) return [];
    return participants.map((participant) => {
      return {
        ...participant,
        answer:
          answers.find((answer) => answer.username === participant.username)
            ?.answer || '',
      };
    });
  }, [participants, answers]);

  if (!Array.isArray(participants) || participants.length === 0) {
    return (
      <Box p={2}>
        <FileDropzone
          caption="Participants list"
          onDrop={(files) => {
            if (files.length > 0) {
              handleParticipantData(files[0]);
            }
          }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Grid
        container
        p={2}
        spacing={2}
        justifyContent="center"
      >
        <Grid
          item
          xs={3}
        >
          <LoadingButton
            variant="contained"
            fullWidth
            loading={loading}
            onClick={getAnswer}
          >
            Fetch Answer
          </LoadingButton>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <LoadingButton
            fullWidth
            loading={loading}
            onClick={clearParticipants}
          >
            Clear All Participant
          </LoadingButton>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        p={1}
      >
        {renderedParticipants.map((item) => (
          <Grid
            item
            xs={4}
            key={item.name}
          >
            <ParticipantCard
              data={item}
              answer={item.answer}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ParticipantList;

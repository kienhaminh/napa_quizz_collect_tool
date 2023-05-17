import { Box, Stack, Button, Card, Typography } from '@mui/material';
import { FileDropzone } from 'src/components/file-dropzone';
import { getQuestions, setQuestions } from 'src/slices/game';
import { useDispatch, useSelector } from 'src/store';
import Papa from 'papaparse';

const QuestionList = () => {
  const questionList = useSelector(getQuestions);
  const dispatch = useDispatch();

  const onDropFile = (file: File) => {
    Papa.parse(file, {
      complete: function (results) {
        if (results.data) {
          const questionList = results.data.map((item: any, index) => {
            return {
              id: index,
              name: item[0],
              username: item[1],
            };
          });
          dispatch(setQuestions(questionList));
        }
      },
    });
  };

  if (!Array.isArray(questionList) || questionList.length === 0) {
    return (
      <Box p={2}>
        <FileDropzone
          caption="Questions list"
          onDropAccepted={(file) => {
            onDropFile(file[0]);
          }}
        />
      </Box>
    );
  }

  return (
    <Stack
      direction="column"
      p={2}
      spacing={2}
    >
      <Stack direction="column">
        <Card>
          <Stack
            direction="column"
            p={2}
          >
            <Typography variant="h6">Question 1</Typography>
            <Typography>{}</Typography>
          </Stack>
        </Card>
      </Stack>
      <Button variant="contained">Next Question</Button>
    </Stack>
  );
};

export default QuestionList;

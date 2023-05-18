import { Stack, Typography, Button } from '@mui/material';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { useRef, useState } from 'react';

const CountDownTimer = () => {
  const [k, setK] = useState(false);
  const countdownRef = useRef<any>();

  const onStartCountDown = () => {
    countdownRef.current?.start();
  };

  const onResetCountdown = () => {
    countdownRef.current?.stop();
    setK((prev) => !prev);
  };

  const renderer = ({
    seconds,
    completed,
    milliseconds,
  }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return <Typography variant="h4">{`Time's up`}</Typography>;
    } else {
      // Render a countdown
      return (
        <Stack
          direction="row"
          alignItems="flex-end"
          spacing={0.5}
        >
          <Typography variant="h4">{seconds}</Typography>
          <Typography variant="body1">{milliseconds}</Typography>
        </Stack>
      );
    }
  };
  return (
    <Stack
      p={2}
      spacing={2}
      direction="column"
    >
      <Stack
        direction="row"
        justifyContent="center"
      >
        <Typography
          variant="h4"
          mr={1}
        >
          Countdown:
        </Typography>
        <Countdown
          key={String(k)}
          date={Date.now() + 15000}
          precision={3}
          intervalDelay={0}
          autoStart={false}
          ref={countdownRef}
          renderer={renderer}
        />
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
      >
        <Button
          variant="contained"
          onClick={onStartCountDown}
        >
          Start
        </Button>
        <Button onClick={onResetCountdown}>Reset</Button>
      </Stack>
    </Stack>
  );
};

export default CountDownTimer;

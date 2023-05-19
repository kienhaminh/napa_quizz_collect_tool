import { useEffect, useState } from 'react';

export const useAudio = (
  url: string
): [playing: boolean, toggle: () => void, reset: () => void] => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  const reset = () => {
    audio.currentTime = 0;
    setPlaying(false);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle, reset];
};

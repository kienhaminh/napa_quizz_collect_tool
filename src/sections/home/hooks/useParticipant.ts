import { useEffect, useState } from 'react';
import { IParticipant } from 'src/types/participant';

interface Params {
  enabled?: boolean;
}

export const useParticipant = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);

  return { participants, setParticipants };
};

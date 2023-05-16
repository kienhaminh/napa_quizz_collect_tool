import type { NextApiResponse,NextApiRequest } from 'next/types';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user, password } = req.body;
    const { data } = await axios.post(
      'https://chat.napaglobal.com/api/v1/login',
      {
        user,
        password,
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

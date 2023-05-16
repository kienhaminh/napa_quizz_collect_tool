import type { NextApiResponse, NextApiRequest } from 'next/types';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { rid, msg, userId, authToken } = req.body;
    const { data } = await axios.post(
      'https://chat.napaglobal.com/api/v1/chat.sendMessage',
      {
        rid,
        msg,
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId as string,
          'X-Auth-Token': authToken as string,
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
}

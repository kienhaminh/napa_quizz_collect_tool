import axios from 'axios';
import type { NextApiResponse, NextApiRequest } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { tmid, userId, authToken } = req.query;

    const { data } = await axios.get(
      `https://chat.napaglobal.com/api/v1/chat.getThreadMessages?tmid=${tmid}&tlm=${new Date()}&count=9999`,
      {
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

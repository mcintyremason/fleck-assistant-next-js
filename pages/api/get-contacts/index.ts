import { NextApiRequest, NextApiResponse } from "next";
import JobNimbusApi from "../../../services/jobnimbus";

// example nextjs api call handler
// not being used
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const jobNimbusApi = new JobNimbusApi();

  try {
    const response = await jobNimbusApi.getContacts();

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;

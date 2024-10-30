import { NextApiRequest, NextApiResponse } from "next";
import JobNimbusApi from "../../../../services/jobnimbus";

// example nextjs api call handler
// not being used
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobNimbusApi = new JobNimbusApi();
  const id = req.query?.id as string;

  try {
    const response = await jobNimbusApi.getContactById(id);

    res.status(response.status).json(response.data);
  } catch (err: any) {
    res
      .status(err.status)
      .json({ statusCode: err.status, message: err.message });
  }
};

export default handler;

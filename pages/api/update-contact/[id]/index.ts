import { NextApiRequest, NextApiResponse } from "next";
import JobNimbusApi from "../../../../services/jobnimbus";

// example nextjs api call handler
// not being used
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobNimbusApi = new JobNimbusApi();
  const id = req.query?.id as string;
  const updatedFields = req.body;

  if (req.method !== "POST") {
    res.status(400).json({ message: "Only POST requests allowed" });
  }

  try {
    const response = await jobNimbusApi.updateContact(id, updatedFields);

    res.status(response.status).json(response.data);
  } catch (err: any) {
    res
      .status(err.status)
      .json({ statusCode: err.status, message: err.message });
  }
};

export default handler;

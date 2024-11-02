import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import JobNimbusApi from "../../../../services/jobnimbus";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const jobNimbusApi = new JobNimbusApi();
  const id = req.query?.id as string;
  const updatedFields = req.body;

  if (req.method !== "PUT") {
    res.status(400).json({ message: "Only PUT requests allowed" });
  }

  try {
    const response = await jobNimbusApi.updateContact(id, updatedFields);

    res.status(response.status).json(response.data);
  } catch (err: any) {
    res
      .status(err.status)
      .json({ statusCode: err.status, message: err.message });
  }
});

import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import JobNimbusApi from "../../../services/jobnimbus";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const jobNimbusApi = new JobNimbusApi();
  const filter = req.query?.filter as string;
  const size = parseInt(req.query?.size as string);

  try {
    const response = await jobNimbusApi.getContacts(filter, size);

    res.status(response.status).json(response.data);
  } catch (err: any) {
    res
      .status(err.status)
      .json({ statusCode: err.status, message: err.message });
  }
});

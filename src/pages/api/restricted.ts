import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

type Data = {
  content?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}

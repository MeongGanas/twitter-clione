import db from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { body } = req.body;
    const { postId } = req.query;
    delete req.body;

    const { currentUser } = await serverAuth(req);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await db.comment.create({
      data: {
        body,
        postId,
        userId: currentUser.id,
      },
    });

    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

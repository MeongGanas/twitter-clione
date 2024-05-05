import db from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { body } = req.body;
      delete req.body;

      const { currentUser } = await serverAuth(req);

      const post = await db.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts;
      if (userId && typeof userId === "string") {
        posts = await db.post.findMany({
          where: { userId },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await db.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

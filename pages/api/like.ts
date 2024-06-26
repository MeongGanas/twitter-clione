import db from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    delete req.body;

    const { currentUser } = await serverAuth(req);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await db.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new Error("No Post with that ID");
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      updatedLikedIds.push(currentUser.id);

      await db.notifications.create({
        data: {
          body: "Someone liked your tweet!",
          userId: post.userId,
        },
      });

      await db.user.update({
        where: { id: post.userId },
        data: {
          hasNotification: true,
        },
      });
    }

    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter((id) => id !== currentUser.id);
    }

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

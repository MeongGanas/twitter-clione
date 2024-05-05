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
    const { userId } = req.body;
    delete req.body;

    const { currentUser } = await serverAuth(req);
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Invalid User");
    }

    let upadatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      upadatedFollowingIds.push(userId);
    }

    if (req.method === "DELETE") {
      upadatedFollowingIds = upadatedFollowingIds.filter((id) => userId !== id);
    }

    const updatedUser = await db.user.update({
      where: { id: currentUser.id },
      data: {
        followingIds: upadatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

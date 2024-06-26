import db from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const { name, username, bio, profileImage, coverImage } = req.body;

    // delete body karena kalau ada isi dari body, serverAuthnya return null
    delete req.body;
    const { currentUser } = await serverAuth(req);

    if (!name || !username) {
      throw new Error("Missing fields.");
    }

    const updatedUser = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

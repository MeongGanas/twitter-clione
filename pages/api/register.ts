import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, username, password, name } = req.body;

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: { name, email, username, password: hashPassword },
    });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}

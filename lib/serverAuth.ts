import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import db from "./db";

export default async function serverAuth(req: NextApiRequest) {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not Signed In");
  }

  const currentUser = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    throw new Error("Not Signed In");
  }

  return { currentUser };
}

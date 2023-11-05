import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );
    const { link, skills, bio } = req.body;

    if (!user) {
      res.status(401).json({
        error: "Unauthorized to perform this action",
      });
    }

    const createdProfile = await db.profile.create({
      data: {
        bio,
        link,
        skills,
        user: { connect: { email: user?.email! } },
      },
    });

    return res.status(200).json({
      error: "null",
      createdProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      createdAPIKey: null,
    });
  }
};

export default handler;

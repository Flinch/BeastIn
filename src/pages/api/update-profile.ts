import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );
    const { link, skills, bio, imageLink } = req.body;

    //console.log(`update-prof ${imageLink}`);

    if (!user) {
      res.status(401).json({
        error: "Unauthorized to perform this action",
      });
    }

    const updatedProfile = await db.profile.update({
      where: {
        userId: user?.id,
      },
      data: {
        bio,
        link,
        skills,
        imageLink,
      },
    });

    return res.status(200).json({
      error: "null",
      updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      updatedProfile: null,
    });
  }
};

export default handler;

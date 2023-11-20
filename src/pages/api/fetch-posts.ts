import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { profile } from "console";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userPostArray = [];
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );
    const { link, skills, bio, imageLink } = req.body;

    if (!user) {
      res.status(401).json({
        error: "Unauthorized to perform this action",
      });
    }

    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    for (const post of posts) {
      const user = await db.user.findFirst({
        where: {
          id: post.authorId!,
        },
      });
      const userProfile = await db.profile.findFirst({
        where: {
          userId: post.authorId!,
        },
      });

      userPostArray.push({
        name: user?.name,
        content: post.content,
        image: userProfile?.imageLink,
        bio: userProfile?.bio,
        link: userProfile?.link,
        skills: userProfile?.skills,
        email: user?.email,
      });
    }

    return res.json(userPostArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      createdAPIKey: null,
    });
  }
};

export default handler;

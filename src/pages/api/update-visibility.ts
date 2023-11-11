import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );
    const { visibility } = req.body;
    //console.log(`JSON val read: ${visibility}`);
    if (!user) {
      res.status(401).json({
        error: "Unauthorized to perform this action",
      });
    }

    const updatedVisibility = await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        isVisible: !user?.isVisible,
      },
    });

    return res.status(200).json({
      error: "null",
      updatedVisibility,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      updatedVisibility: null,
    });
  }
};

export default handler;

import { FC } from "react";
import Paragraph from "@/components/Paragraph";
import LargeHeading from "@/components/LargeHeading";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import SetupProfile from "@/components/SetupProfile";
import Profile from "@/components/Profile";

const Page = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const getUserProfile = await db.profile.findMany({
    where: {
      userId: user.user.id,
    },
  });

  return (
    <div className="flex justify-center pt-[100px]">
      {getUserProfile.length === 0 ? <SetupProfile /> : <Profile />}
    </div>
  );
};

export default Page;

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LargeHeading from "./LargeHeading";
import Paragraph from "./Paragraph";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import UpdateProfileForm from "./UpdateProfileForm";
import MembersCard from "./MembersCard";
import { useState } from "react";
import VisibilityToggle from "./VisibilityToggle";

const Profile = async () => {
  const user = await getServerSession(authOptions);
  if (!user) {
    return notFound();
  }
  const userProfile = await db.profile.findFirst({
    where: {
      userId: user.user.id,
    },
  });

  //console.log(`BEFORE TOGGLE: ${user.user.isVisible}`);

  return (
    <div className="flex flex-col items-center justify-center pt-[200px]">
      {" "}
      <LargeHeading size="default">
        Here is your card, {user?.user.name}
      </LargeHeading>{" "}
      <br />
      <MembersCard
        name={user.user.name!}
        email={user.user.email!}
        links={userProfile?.link ?? ""}
        bio={userProfile?.bio ?? ""}
        skills={userProfile?.skills ?? ""}
      />
      <UpdateProfileForm
        name={user.user.name!}
        email={user.user.email!}
        links={userProfile?.link ?? ""}
        biography={userProfile?.bio ?? ""}
        skillset={userProfile?.skills ?? ""}
      />
      <VisibilityToggle isVisible={user.user.isVisible} />
    </div>
  );
};

export default Profile;

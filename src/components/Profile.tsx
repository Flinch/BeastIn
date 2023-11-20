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
import UpdateYourAvatar from "./UpdateYourAvatar";

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

  //console.log(`IMAGE_PROFILE: ${userProfile?.imageLink}`);

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
        image={userProfile?.imageLink ?? ""}
        links={userProfile?.link ?? ""}
        bio={userProfile?.bio ?? ""}
        skills={userProfile?.skills ?? ""}
      />
      <div className="flex flex-row gap-3">
        <UpdateProfileForm
          name={user.user.name!}
          email={user.user.email!}
          image={userProfile?.imageLink ?? ""}
          links={userProfile?.link ?? ""}
          biography={userProfile?.bio ?? ""}
          skillset={userProfile?.skills ?? ""}
        />
      </div>
      <VisibilityToggle isVisible={user.user.isVisible} />
    </div>
  );
};

export default Profile;

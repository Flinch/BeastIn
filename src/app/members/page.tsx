import { FC, useEffect, useState } from "react";
import MembersCard from "@/components/MembersCard";
import { db } from "@/lib/db";

[];
const Page = async () => {
  const userArray: Array<{
    name: string;
    email: string;
    link: string;
    bio: string;
    skills: string;
    imageLink: string;
  }> = [];
  //   const [userArray, setUserArray] = useState<Array<userArrayType>>([]);

  const fetchUsers = async () => {
    const getAllUsers = await db.user.findMany({
      where: {
        isVisible: true,
      },
    });
    for (const user of getAllUsers) {
      const getUserProfile = await db.profile.findFirst({
        where: {
          userId: user.id,
        },
      });
      // console.log(`USER: ${user.id}`);
      // console.log(`THIER PROFILE: ${getUserProfile?.userId}`);
      userArray.push({
        name: user.name!,
        email: user.email!,
        link: getUserProfile?.link ?? "",
        bio: getUserProfile?.bio ?? "",
        skills: getUserProfile?.skills ?? "",
        imageLink: getUserProfile?.imageLink ?? "",
      });
    }
    return userArray;
  };

  let array = await fetchUsers();

  return (
    <div className="pl-[125px] grid-cols-3 gap-10 grid pt-[100px] ">
      {array.map((user, i) => {
        return (
          <MembersCard
            key={i}
            name={user.name}
            email={user.email}
            links={user.link}
            skills={user.skills}
            bio={user.bio}
            image={user.imageLink}
          />
        );
      })}
    </div>
  );
};

export default Page;

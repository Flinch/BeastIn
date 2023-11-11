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
      });
    }
    return userArray;
  };

  let array = await fetchUsers();

  return (
    <div className="grid-cols-3 justify-around flex pt-[100px]">
      {array.map((user, i) => {
        return (
          <MembersCard
            key={i}
            name={user.name}
            email={user.email}
            links={user.link}
            skills={user.skills}
            bio={user.bio}
          />
        );
      })}
    </div>
  );
};

export default Page;

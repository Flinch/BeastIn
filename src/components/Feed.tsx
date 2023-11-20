import { FC, useState } from "react";
import FeedsCard from "./FeedsCard";
import { user } from "@nextui-org/react";
import DynamicProfile from "./DynamicProfile";

interface FeedProps {
  userProfiles: {
    name: string;
    content: string;
    image: string;
    skills: string;
    bio: string;
    link: string;
    email: string;
  }[];
}
const Feed: FC<FeedProps> = ({ userProfiles }) => {
  return (
    <div>
      {userProfiles.map((userProfile) => {
        return (
          <div className="pt-3 container flex flex-col">
            {" "}
            <FeedsCard
              name={userProfile.name}
              image={userProfile.image}
              content={userProfile.content}
              email={userProfile.email}
              bio={userProfile.bio}
              link={userProfile.link}
              skills={userProfile.skills}
            />{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Feed;

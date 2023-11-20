"use client";
import { FC, useState } from "react";
import Post from "@/components/Post";
import { useEffect } from "react";
import FeedsCard from "@/components/FeedsCard";
import Feed from "@/components/Feed";
import { Spinner } from "@nextui-org/react";

interface PageProps {}

const Page: FC<PageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState([
    {
      name: "",
      content: "",
      image: "",
      link: "",
      bio: "",
      skills: "",
      email: "",
    },
  ]);
  const onFetchContent = async () => {
    const response = await fetch("/api/fetch-posts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setUserProfile(data);
    console.log(userProfile);
    setIsLoading(false);
  };

  useEffect(() => {
    onFetchContent();
  }, [userProfile]);
  return (
    <div className="flex-col flex items-center pt-[100px] container">
      {" "}
      <div className="flex flex-col">
        <Post /> <br />{" "}
      </div>
      {isLoading ? (
        <Spinner label="Fetching Posts" />
      ) : (
        <Feed userProfiles={userProfile} />
      )}
    </div>
  );
};

export default Page;

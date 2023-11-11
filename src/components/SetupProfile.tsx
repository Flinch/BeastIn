import { FC } from "react";
import SetupProfileForm from "./SetupProfileForm";
import LargeHeading from "./LargeHeading";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "@/lib/auth";
import Paragraph from "./Paragraph";

interface SetupProfileProps {}
const SetupProfile: FC<SetupProfileProps> = async () => {
  const user = await getServerSession(authOptions);

  return (
    <div className="flex flex-col justify-center container items-center pt-[200px]">
      <LargeHeading size="default"> Welcome, {user?.user.name}</LargeHeading>
      <br />
      <Paragraph>Setup your beast card below to get started</Paragraph>
      <div className="flex justify-center pt-4">
        <SetupProfileForm name={user?.user.name!} email={user?.user.email!} />
      </div>
    </div>
  );
};

export default SetupProfile;

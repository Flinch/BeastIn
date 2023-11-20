import MembersCard from "@/components/MembersCard";
import Paragraph from "@/components/Paragraph";
import LargeHeading from "@/components/LargeHeading";
import SignInHomeButton from "@/components/SignInHomeButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="relative pt-[250px]  flex flex-col gap-4 justify-start items-center">
      <LargeHeading size="default"> Welcome to BeastIn. </LargeHeading>
      <Paragraph> LinkedIn, but for BEASTS.</Paragraph>
      {!session ? (
        <SignInHomeButton />
      ) : (
        <Button isLoading={false} variant={"home"}>
          {" "}
          <Link href="/profile"> Go to Profile {`->`} </Link>{" "}
        </Button>
      )}
    </div>
  );
};

export default Page;

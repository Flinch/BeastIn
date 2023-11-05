import MembersCard from "@/components/MembersCard";
import Paragraph from "@/components/Paragraph";
import LargeHeading from "@/components/LargeHeading";
import SignInHomeButton from "@/components/SignInHomeButton";

const Page = () => {
  return (
    <div className="relative pt-[250px]  flex flex-col gap-4 justify-start items-center">
      <LargeHeading size="default"> Welcome to BeastIn. </LargeHeading>
      <Paragraph> LinkedIn, but for BEASTS.</Paragraph>
      <SignInHomeButton />
    </div>
  );
};

export default Page;

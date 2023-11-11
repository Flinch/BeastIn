import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { FC } from "react";
import Icons from "./Icons";

interface MembersCardProps {
  name: string;
  email: string;
  links: string;
  bio: string;
  skills: string;
}

const MembersCard: FC<MembersCardProps> = ({
  name,
  email,
  links,
  bio,
  skills,
}) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-4">
        <Image
          alt="nextui logo"
          height={10}
          radius="sm"
          src="../beast-pfp.png"
          width={80}
        />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <div className="flex flex-row gap-1">
            <Icons.Link className="mt-[0.33em] h-3 w-3" />
            <Link isExternal showAnchorIcon size="sm" href={links}>
              {links}
            </Link>
          </div>
          <div className="flex flex-row gap-1">
            <Icons.Mails className="mt-[0.33em] h-3 w-3" />
            <p className="text-sm"> {email}</p>
          </div>
        </div>
      </CardHeader>
      <Divider className="h-[1px] bg-white" />
      <CardBody>
        <div className="inline-block">
          <p>{bio}</p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <p> {skills}</p>
      </CardFooter>
    </Card>
  );
};

export default MembersCard;

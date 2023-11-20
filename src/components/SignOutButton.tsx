"use client";

import Button from "./Button";
import { FC, useState } from "react";
import { buttonVariants } from "./Button";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropDownMenu";
import { Image, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
  userImage: string;
}

const SignOutButton: FC<SignOutButtonProps> = ({ userImage }) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signUserOut = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      //   toast({
      //     title: "error signing out",
      //     message: "please try again",
      //     type: "error",
      //   });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Image
          alt="nextui logo"
          height={35}
          radius="full"
          src={userImage === "" ? "../beast-pfp.png" : userImage}
          width={35}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            push("/profile");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signUserOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SignOutButton;

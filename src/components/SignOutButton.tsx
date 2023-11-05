"use client";

import Button from "./Button";
import { FC, useState } from "react";
import { buttonVariants } from "./Button";
import { signOut } from "next-auth/react";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
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
    <Button
      onClick={signUserOut}
      isLoading={isLoading}
      className={buttonVariants({ variant: "default" })}
    >
      {" "}
      Sign Out{" "}
    </Button>
  );
};

export default SignOutButton;

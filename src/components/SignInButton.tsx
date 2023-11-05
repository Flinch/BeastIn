"use client";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import Button, { buttonVariants } from "./Button";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (err) {
      console.log("unable to sign in with google");
    }
  };
  return (
    <div>
      {" "}
      <Button
        onClick={signInWithGoogle}
        isLoading={isLoading}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Button>
    </div>
  );
};

export default SignInButton;

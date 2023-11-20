import { FC } from "react";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOutButton from "./SignOutButton";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Icons from "./Icons";

interface NavbarProps {}

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }

  const userProfile = await db.profile.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" style={{ fontSize: "medium" }}>
          {" "}
          BeastIn
        </Link>

        {session ? (
          <div className="flex gap-7">
            <div className="mt-2 flex-row gap-5 flex">
              <Link href="/feed" aria-disabled>
                {" "}
                <Icons.Rss />{" "}
              </Link>
              <Link href="/members">
                {" "}
                <Icons.Users />{" "}
              </Link>
              <Link href="">
                {" "}
                <Icons.Mail />{" "}
              </Link>

              {/* <Link href="/profile"> Profile </Link> */}
            </div>
            <SignOutButton userImage={userProfile?.imageLink ?? ""} />
          </div>
        ) : (
          <div className="flex gap-5">
            <Link href="/members"> </Link>
            <SignInButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LargeHeading from "./LargeHeading";

const Profile = async () => {
  const user = await getServerSession(authOptions);

  return (
    <div className="flex justify-center pt-[200px]">
      {" "}
      <LargeHeading size="large">
        Welcome Back, {user?.user.name}
      </LargeHeading>{" "}
    </div>
  );
};

export default Profile;

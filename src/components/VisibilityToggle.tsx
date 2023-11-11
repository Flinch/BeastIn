"use client";
import { FC, useState } from "react";
import { Switch } from "@nextui-org/react";
import { useScroll } from "framer-motion";
import Router, { useRouter } from "next/navigation";

interface VisibilityToggleProps {
  isVisible: boolean;
}

const VisibilityToggle: FC<VisibilityToggleProps> = ({ isVisible }) => {
  const router = useRouter();
  //const [visibility, setVisibility] = useState<boolean>(isVisible);

  const updateVisibility = async () => {
    const response = await fetch("/api/update-visibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      router.refresh();
    });
  };
  return (
    <div>
      {" "}
      <div className="justify-center">
        {" "}
        <br />
        <Switch
          defaultSelected={isVisible}
          onChange={() => {
            updateVisibility();
          }}
        >
          Visibility Status
        </Switch>
      </div>
    </div>
  );
};

export default VisibilityToggle;

"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LargeHeading from "./LargeHeading";
import Paragraph from "./Paragraph";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import UpdateProfileForm from "./UpdateProfileForm";
import MembersCard from "./MembersCard";
import { useState } from "react";
import VisibilityToggle from "./VisibilityToggle";
import UpdateYourAvatar from "./UpdateYourAvatar";
import { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
} from "@nextui-org/react";

interface DynamicProfileProps {
  name: string;
  image: string;
  //   link: string;
  //   email: string;
  //   bio: string;
  //   skillset: string;
}

const DynamicProfile: FC<DynamicProfileProps> = ({
  name,
  image,
  //   link,
  //   email,
  //   bio,
  //   skillset,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log("here");
  return (
    <div className="flex flex-col items-center justify-center pt-[200px]">
      {" "}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={false}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="dark:bg-slate-900">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Edit Your Profile
              </ModalHeader>
              <ModalBody>
                {name}
                {image}
              </ModalBody>
              <ModalFooter>
                {" "}
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DynamicProfile;

"use client";
import { FC, useState } from "react";
import { FormEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import Button from "./Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Textarea } from "@nextui-org/react";

interface SetupProfileFormProps {
  name: string;
  email: string;
}

const SetupProfileForm: FC<SetupProfileFormProps> = ({ name, email }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [link, setLink] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const profile = { link, skills, bio };

    try {
      const response = await fetch("/api/create-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <Button onClick={onOpen} isLoading={false} variant="home">
        Register Your Beast Now
      </Button>
      <Modal
        onSubmit={onSubmitForm}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                Tell us a bit about yourself
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="name"
                  variant="bordered"
                  defaultValue={name}
                  disabled
                />
                <Input
                  autoFocus
                  label="email"
                  variant="bordered"
                  defaultValue={email}
                  disabled
                />
                <Input
                  autoFocus
                  label="skills"
                  placeholder="Enter your skills"
                  variant="bordered"
                />
                <Input
                  autoFocus
                  label="links"
                  placeholder="Enter your links"
                  variant="bordered"
                />
                <Textarea
                  autoFocus
                  label="bio"
                  placeholder="Enter your Bio"
                  variant="bordered"
                  size="lg"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="default"
                  onClick={onClose}
                  isLoading={false}
                >
                  Close
                </Button>
                <Button color="primary" isLoading={false} onClick={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SetupProfileForm;

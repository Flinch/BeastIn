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
  Button,
} from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Textarea } from "@nextui-org/react";
import ButtonHome from "./Button";
import { useRouter } from "next/navigation";
import { set } from "lodash";

interface UpdateProfileFormProps {
  name: string;
  email: string;
  links: string;
  biography: string;
  skillset: string;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({
  name,
  email,
  links,
  biography,
  skillset,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [link, setLink] = useState(links);
  const [skills, setSkills] = useState(skillset);
  const [bio, setBio] = useState(biography);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const onSubmitForm = async () => {
    console.log("here");
    setIsModalOpen(false);
    // event.preventDefault();
    const profile = { link, skills, bio };
    const response = await fetch("/api/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const data = await response.json();

    router.refresh();
  };

  const ToggleModalStateTrue = () => {
    setIsModalOpen(true);
  };

  const ToggleModalStateFalse = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {" "}
      <ButtonHome
        onClick={ToggleModalStateTrue}
        isLoading={false}
        variant="home"
        className="mt-[25px]"
      >
        Update Your Card
      </ButtonHome>
      <form onSubmit={onSubmitForm}>
        <Modal
          isOpen={isModalOpen}
          onOpenChange={onOpenChange}
          hideCloseButton={true}
          backdrop="opaque"
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent className="dark:bg-slate-900">
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Edit Your Profile
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
                    value={skills}
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
                  />
                  <Input
                    autoFocus
                    label="links"
                    placeholder="Enter your links"
                    variant="bordered"
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                  />
                  <Textarea
                    //maxLength={255}
                    autoFocus
                    label="bio"
                    placeholder="Enter your Bio"
                    variant="bordered"
                    size="lg"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={ToggleModalStateFalse}
                    isLoading={false}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    isLoading={false}
                    onClick={onSubmitForm}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default UpdateProfileForm;

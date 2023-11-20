"use client";
import "@/styles/globals.css";
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
import { toast } from "react-toastify";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

interface UpdateProfileFormProps {
  name: string;
  email: string;
  links: string;
  biography: string;
  skillset: string;
  image: string;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({
  name,
  email,
  links,
  biography,
  skillset,
  image,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [link, setLink] = useState(links);
  const [skills, setSkills] = useState(skillset);
  const [bio, setBio] = useState(biography);
  const [imageLink, setImageLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<File | null>(null);
  const [chooseFileButton, setChooseFileButton] = useState(false);
  const router = useRouter();

  const onSubmitForm = async () => {
    try {
      setIsLoading(true);
      setIsModalOpen(false);
      setChooseFileButton(false);
      if (fileName === null) {
        setImageLink(image);
        return;
      }
      const imageRef = ref(storage, `images/${fileName.name + v4()}`);
      await uploadBytes(imageRef, fileName);

      await getDownloadURL(imageRef).then(async (downloadURL) => {
        const imageLink = downloadURL ? downloadURL : image;
        const profile = { link, skills, bio, imageLink };
        const response = await fetch("/api/update-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        });
        await response.json().then(() => {
          console.log(response);
          setIsLoading(false);
          router.refresh();
          toast.success("Profile Updated!");
        });
        console.log(`download_url: ${downloadURL}`);
      });
      //
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong, please try again");
    }
  };

  const revealChooseFileButton = () => {
    setChooseFileButton(true);
  };

  const ToggleModalStateTrue = () => {
    setIsModalOpen(true);
  };

  const ToggleModalStateFalse = () => {
    setIsModalOpen(false);
    setChooseFileButton(false);
  };
  return (
    <>
      {" "}
      <ButtonHome
        onClick={ToggleModalStateTrue}
        isLoading={isLoading}
        variant="home"
        className="mt-[25px]"
      >
        {isLoading ? "Updating" : "Update Your Card"}
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
                  {chooseFileButton ? (
                    <input
                      type="file"
                      onChange={(event) => {
                        setFileName(event.target.files![0]);
                      }}
                    ></input>
                  ) : (
                    <ButtonHome
                      variant="home"
                      isLoading={false}
                      onClick={() => {
                        revealChooseFileButton();
                      }}
                    >
                      {" "}
                      Change Your Avatar
                    </ButtonHome>
                  )}
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

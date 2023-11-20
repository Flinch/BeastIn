"use client";
import { FC } from "react";
import Button from "./Button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

interface UpdateYourAvatarProps {}

const UpdateYourAvatar: FC<UpdateYourAvatarProps> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fileName, setFileName] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const uploadImage = () => {
    if (fileName === null) {
      return;
    }
    const imageRef = ref(storage, `images/${fileName.name + v4()}`);

    uploadBytes(imageRef, fileName).then(() => {
      getDownloadURL(imageRef).then((downloadURL) => {
        setIsModalOpen(false);

        console.log(`IMAGE_dwn: ${downloadURL}`);
      });
    });
  };
  const ToggleModalStateTrue = () => {
    setIsModalOpen(true);
  };

  const ToggleModalStateFalse = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-[25px]">
      <Button isLoading={false} variant="home" onClick={ToggleModalStateTrue}>
        {" "}
        Update Your Avatar
      </Button>
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
                Update Avatar
              </ModalHeader>
              <ModalBody>
                <input
                  type="file"
                  onChange={(event) => {
                    setFileName(event.target.files![0]);
                  }}
                ></input>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={ToggleModalStateFalse}
                  isLoading={false}
                >
                  Close
                </Button>
                <Button color="primary" isLoading={false} onClick={uploadImage}>
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateYourAvatar;

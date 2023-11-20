import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Divider,
  Link,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { FC } from "react";
import Icons from "./Icons";
import MembersCard from "./MembersCard";

interface FeedsCardProps {
  name: string;
  content: string;
  image: string;
  email: string;
  link: string;
  skills: string;
  bio: string;
}

const FeedsCard: FC<FeedsCardProps> = ({
  name,
  content,
  image,
  email,
  link,
  skills,
  bio,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      {" "}
      <Card className="w-[500px]">
        <CardHeader className="justify-between pb-0">
          <div className="flex gap-5">
            <div className="">
              {" "}
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={image}
                className="relative top-[15px]"
              />
            </div>

            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-white-600 ">
                <Link
                  onClick={onOpen}
                  color="foreground"
                  className="cursor-pointer"
                >
                  {" "}
                  {name}{" "}
                </Link>
              </h4>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 pb-3 pt-0 text-small text-white-400">
          <div className=" ml-[60px]">
            <p>{content}</p>
          </div>
        </CardBody>
      </Card>{" "}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          header: "z-10",
          body: "px-0 py-0",
        }}
      >
        <ModalContent className="dark:bg-slate-900 bg-transparent">
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1 text-center">
                Edit Your Profile
              </ModalHeader> */}
              <ModalBody>
                <div className="w-100">
                  <MembersCard
                    name={name}
                    email={email}
                    links={link}
                    bio={bio}
                    skills={skills}
                    image={image}
                  />
                </div>
              </ModalBody>
              {/* <ModalFooter>
                {" "}
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FeedsCard;

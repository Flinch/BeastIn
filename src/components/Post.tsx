"use client";
import { FC } from "react";
import { useState } from "react";
import { CardFooter, Input, Textarea } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  Avatar,
  useDisclosure,
} from "@nextui-org/react";
import ButtonHome from "@/components/Button";
import { toast } from "react-toastify";

interface PostProps {}

const Post: FC<PostProps> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitPost = async () => {
    setIsLoading(true);
    try {
      const postContent = { content };
      if (content.length === 0) {
        throw new Error("Cannot leave post blank");
        return;
      }
      const response = await fetch("/api/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postContent),
      });

      const data = await response.json().then(() => {
        setIsLoading(false);
        toast.success("Successfully posted!");
        setContent("");
      });
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something Went Wrong. Please try again.");
      }
    }
  };
  return (
    <div className="flex justify-center">
      <Card className="min-w-[500px]">
        <CardBody className="px-3 pb-3 pt-0 text-small text-white-400">
          <Textarea
            variant="underlined"
            placeholder="Tell your fellow beasts what you're up to"
            size="sm"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
        </CardBody>
        <CardFooter className="flex justify-end pt-2 pb-2">
          <ButtonHome
            variant={"default"}
            isLoading={isLoading}
            color="primary"
            onClick={onSubmitPost}
          >
            Post
          </ButtonHome>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;

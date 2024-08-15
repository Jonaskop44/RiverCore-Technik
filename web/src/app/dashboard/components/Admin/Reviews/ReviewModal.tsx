import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  Textarea,
} from "@nextui-org/react";
import { Review } from "@/types/reviews";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdStopwatch } from "react-icons/io";
import { on } from "events";

interface ReviewModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  data: Review;
  profilePicture: string;
  onStatusUpdate: (reviewId: number, status: string) => void;
  selectedFilter: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  data,
  profilePicture,
  onStatusUpdate,
  selectedFilter,
}) => {
  const renderButtons = (item: Review) => {
    if (selectedFilter === "Pending") {
      return (
        <>
          <Button
            color="danger"
            className="cursor-pointer"
            onClick={() => {
              onStatusUpdate(item.id, "REJECTED");
              onOpenChange(false);
            }}
          >
            Ablehnen
          </Button>
          <Button
            color="primary"
            className="cursor-pointer"
            onClick={() => {
              onStatusUpdate(item.id, "ACCEPTED");
              onOpenChange(false);
            }}
          >
            Akzeptieren
          </Button>
        </>
      );
    } else if (selectedFilter === "Accepted") {
      return (
        <>
          <Button
            color="warning"
            className="cursor-pointer"
            onClick={() => {
              onStatusUpdate(item.id, "PENDING");
              onOpenChange(false);
            }}
          >
            Ausstehend
          </Button>
          <Button
            color="danger"
            className="cursor-pointer"
            onClick={() => {
              onStatusUpdate(item.id, "REJECTED");
              onOpenChange(false);
            }}
          >
            Ablehnen
          </Button>
        </>
      );
    } else if (selectedFilter === "Rejected") {
      return (
        <>
          <Button
            color="warning"
            className="cursor-pointer"
            onClick={() => {
              onStatusUpdate(item.id, "PENDING");
              onOpenChange(false);
            }}
          >
            Ausstehend
          </Button>
          <Button
            color="primary"
            className="cursor-pointer"
            onClick={() => {
              onStatusUpdate(item.id, "ACCEPTED");
            }}
          >
            Akzeptiert
          </Button>
        </>
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => onOpenChange(false)}
      placement="center"
      backdrop="blur"
      className="z-99999"
      classNames={{
        base: "dark:bg-blacksection dark:text-white",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center items-center dark:text-white">
              <Avatar size="lg" src={profilePicture} />
              <div>
                <h4 className="ml-4 text-lg font-semibold text-gray-800 dark:text-gray-300">
                  {data.author.user.firstName} {data.author.user.lastName}
                </h4>
                <p className="ml-4 text-medium font-medium text-gray-800 dark:text-gray-300">
                  {data.author.user.designation === "COMPANY"
                    ? data.author.user.companyName
                    : "Privatperson"}
                </p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center items-center mt-1.5">
                {Array.from({ length: 5 }, (_, i) => {
                  const starValue = i + 1;
                  return starValue <= data.rating ? (
                    <IoStar key={i} className="text-primary" size={30} />
                  ) : starValue - 0.5 === data.rating ? (
                    <IoStarHalf key={i} className="text-primary" size={30} />
                  ) : (
                    <IoStarOutline key={i} className="text-primary" size={30} />
                  );
                })}
              </div>
              <Input
                label="Title"
                isReadOnly
                defaultValue={data.title}
                variant="underlined"
              />
              <Textarea
                label="Review"
                isReadOnly
                defaultValue={data.content}
                variant="underlined"
              />
            </ModalBody>
            <ModalFooter>{renderButtons(data)}</ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;

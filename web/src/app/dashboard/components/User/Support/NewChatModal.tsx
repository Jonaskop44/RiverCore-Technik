import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

interface NewChatModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  handleCreateChat: () => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  title,
  setTitle,
  handleCreateChat,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const isTitleValid = useMemo(() => {
    return title.trim() === "";
  }, [title]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange(false);
          setTitle("");
          setTouched(false);
          setIsLoading(false);
        }}
        placement="center"
        backdrop="blur"
        className="z-99999"
        classNames={{
          base: "dark:bg-black",
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
              <ModalHeader className="flex flex-col gap-1 dark:text-white">
                Neues Support-Ticket
              </ModalHeader>
              <ModalBody>
                <p>
                  Um ein neues Support-Ticket erstellen zu können müssen Sie
                  Titel angeben worum es bei Ihrem Anliegen geht.
                </p>
                <Input
                  label="Titel"
                  isRequired
                  onBlur={() => setTouched(true)}
                  color={touched && isTitleValid ? "danger" : "default"}
                  isInvalid={touched && isTitleValid}
                  errorMessage="Bitte geben Sie einen Titel an"
                  variant="underlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  disabled={isTitleValid}
                  color="primary"
                  onPress={() => {
                    handleCreateChat();
                    setTouched(false);
                  }}
                  className={`cursor-pointer ${
                    isTitleValid ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Erstellen
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewChatModal;

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Link,
} from "@nextui-org/react";
import { User } from "@/types/user";

interface EditUserModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  data: User;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  data,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange(false);
        }}
        placement="center"
        backdrop="blur"
        className="z-99999"
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
                Konto aktivieren
              </ModalHeader>
              <ModalBody>
                <p>
                  Um Ihr Konto zu aktivieren geben Sie bitte den 15-minütigen
                  gültigen Bestätigungscode ein, den wir an{" "}
                  <span className="font-semibold">data.email</span> gesendet
                  haben.
                </p>
                <Input
                  label="Bestätigungscode"
                  isRequired
                  errorMessage="Bitte geben Sie den Bestätigungscode ein"
                  variant="underlined"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" size="sm" className="cursor-pointer">
                    Bestätigungscode erneut senden
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => console.log("Test")}
                  className="cursor-pointer"
                >
                  Bestätigen
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUserModal;

import React, { useState } from "react";
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
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface VerificationModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  email: string;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  email,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Konto aktivieren
              </ModalHeader>
              <ModalBody>
                <p>
                  Um vollen Zugriff auf Ihr Konto zu erhalten, geben Sie bitte
                  den Bestätigungscode ein, den wir an{" "}
                  <span className="font-semibold"> {email} </span> gesendet
                  haben.
                </p>
                <Input
                  label="Bestätigungscode"
                  type={isVisible ? "text" : "password"}
                  variant="underlined"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" href="#" size="sm">
                    Bestätigungscode erneut senden
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerificationModal;

import React, { useMemo, useState } from "react";
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
import Client from "@/client";

interface VerificationModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  email: string;
}
const client = new Client();

const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  email,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const isCodeValid = useMemo(() => {
    return code.trim() === "";
  }, [code]);

  const onSubmit = async () => {
    setIsLoading(true);
    const token = await client.auth.helper.activateUser(code);

    if (token.status) {
      onOpenChange(false);
    } else {
      console.log(token.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        className="z-99999"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Konto aktivieren
              </ModalHeader>
              <ModalBody>
                <p>
                  Um Ihr Konto zu aktivieren geben Sie bitte den 15-minütigen
                  gültigen Bestätigungscode ein, den wir an{" "}
                  <span className="font-semibold">{email}</span> gesendet haben.
                </p>
                <Input
                  label="Bestätigungscode"
                  type={isVisible ? "text" : "password"}
                  isRequired
                  onBlur={() => setTouched(true)}
                  color={touched && isCodeValid ? "danger" : "default"}
                  isInvalid={touched && isCodeValid}
                  errorMessage="Bitte geben Sie den Bestätigungscode ein"
                  variant="underlined"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onPress={onSubmit}
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

export default VerificationModal;

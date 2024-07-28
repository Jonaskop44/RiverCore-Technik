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
  useDisclosure,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import ApiClient from "@/api";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  email: string;
}
const apiClient = new ApiClient();

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
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
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    isOpen: isOpenReset,
    onOpen: onOpenReset,
    onOpenChange: onOpenChangeReset,
  } = useDisclosure();

  const isCodeValid = useMemo(() => {
    return code.trim() === "";
  }, [code]);

  const onSubmit = async () => {
    setIsLoading(true);
    const token = await apiClient.auth.helper.checkPasswordRestToken(code);

    if (token.status) {
      onOpenChange(false);
      setCode("");
      setTouched(false);
      setIsVisible(false);
      setIsLoading(false);
      setIsDisabled(false);
    } else {
      toast.error("Der Sicherheitscode ist ungültig");
    }

    setIsLoading(false);
  };

  const onResend = async () => {
    const email_ = await apiClient.auth.helper.resendActivationEmail(email);
    setIsDisabled(true);

    if (email_.status) {
      toast.success("Sicherheitscode wurde erneut gesendet");
    } else {
      toast.error("E-Mail konnte nicht gesendet werden");
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange(false);
          setCode("");
          setTouched(false);
          setIsVisible(false);
          setIsLoading(false);
          setIsDisabled(false);
        }}
        placement="center"
        backdrop="blur"
        className="z-99999"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Passwort zurücksetzen
              </ModalHeader>
              <ModalBody>
                <p>
                  Um Ihr Passwort zurückzusetzen, benötigen wir einen
                  Sicherheitscode den wir Ihnen per E-Mail gesendet haben.
                </p>
                <Input
                  label="Sicherheitscode"
                  type={isVisible ? "text" : "password"}
                  isRequired
                  onBlur={() => setTouched(true)}
                  color={touched && isCodeValid ? "danger" : "default"}
                  isInvalid={touched && isCodeValid}
                  errorMessage="Bitte geben Sie den Sicherheitscode ein"
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
                  <Link
                    color="primary"
                    size="sm"
                    isDisabled={isDisabled}
                    onPress={onResend}
                    className="cursor-pointer"
                  >
                    Sicherheitscode erneut senden
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  disabled={isCodeValid}
                  color="primary"
                  onPress={onSubmit}
                  className={`cursor-pointer ${
                    isCodeValid ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Prüfen
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenReset}
        onOpenChange={() => {
          onOpenChange(false);
          setCode("");
          setTouched(false);
          setIsVisible(false);
          setIsLoading(false);
          setIsDisabled(false);
        }}
        placement="center"
        backdrop="blur"
        className="z-99999"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Passwort zurücksetzen
              </ModalHeader>
              <ModalBody>
                <p>
                  Geben Sie nun ein neues Passwort ein um den Vorgang
                  abzuschließen.
                </p>
                <Input
                  label="Sicherheitscode"
                  type={isVisible ? "text" : "password"}
                  isRequired
                  onBlur={() => setTouched(true)}
                  color={touched && isCodeValid ? "danger" : "default"}
                  isInvalid={touched && isCodeValid}
                  errorMessage="Bitte geben Sie den Sicherheitscode ein"
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
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  disabled={isCodeValid}
                  color="primary"
                  onPress={onSubmit}
                  className={`cursor-pointer ${
                    isCodeValid ? "cursor-not-allowed" : ""
                  }`}
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

export default ResetPasswordModal;

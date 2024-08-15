import React, { use, useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";
import { User } from "@/types/user";
import ApiClient from "@/api";
import { toast } from "sonner";

interface EditUserModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  data: User;
}

const designation = [
  { key: "COMPANY", label: "Unternehmen" },
  { key: "PERSON", label: "Privatperson" },
];

const roles = [
  { key: "ADMIN", label: "Administrator" },
  { key: "MODERATOR", label: "Moderator" },
  { key: "USER", label: "Benutzer" },
];

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  data,
}) => {
  const apiClient = new ApiClient();
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(data.role);
  const [designationValue, setDesignationValue] = useState(data.designation);
  const [companyName, setCompanyName] = useState(data.companyName || "");
  const [activated, setActivated] = useState(data.activated);
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    role: false,
    designation: false,
    companyName: false,
  });

  const isInvalidFirstName = useMemo(() => {
    return firstName.trim() === "";
  }, [firstName]);

  const isInvalidLastName = useMemo(() => {
    return lastName.trim() === "";
  }, [lastName]);

  const isInvalidEmail = useMemo(() => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }, [email]);

  const isInvalidCompanyName = useMemo(() => {
    return designationValue === "COMPANY" && companyName.trim() === "";
  }, [companyName, designationValue]);

  const isFormValid = useMemo(() => {
    return (
      !isInvalidFirstName &&
      !isInvalidLastName &&
      !isInvalidEmail &&
      !isInvalidCompanyName
    );
  }, [
    isInvalidFirstName,
    isInvalidLastName,
    isInvalidEmail,
    isInvalidCompanyName,
  ]);

  const handleSave = async () => {
    const updatedUser = {
      firstName,
      lastName,
      email,
      role,
      designation: designationValue,
      companyName: designationValue === "COMPANY" ? companyName : "",
      activated,
    };

    try {
      const response = await apiClient.user.helper.updateUser(
        data.id,
        updatedUser
      );
      if (response.status) {
        toast.success("Benutzer erfolgreich aktualisiert");
        onOpenChange(false);
      } else {
        toast.error(
          "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut!"
        );
      }
    } catch (error) {
      toast.error(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut!"
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
            <ModalHeader className="flex flex-col gap-1 dark:text-white">
              Benutzer bearbeiten
            </ModalHeader>
            <ModalBody>
              <p>
                Um die Details für den Benutzer{" "}
                <b>
                  {data.firstName} {data.lastName}{" "}
                </b>
                zu bearbeiten, passen Sie bitte die folgenden Informationen an:
              </p>
              <Input
                label="Vorname"
                defaultValue={data.firstName}
                isRequired
                variant="underlined"
                onChange={(e) => setFirstName(e.target.value)}
                isInvalid={touched.firstName && isInvalidFirstName}
                errorMessage="Bitte geben Sie Ihren Namen ein"
                color={
                  touched.firstName && isInvalidFirstName ? "danger" : "default"
                }
                onBlur={() => setTouched({ ...touched, firstName: true })}
              />
              <Input
                label="Nachname"
                defaultValue={data.lastName}
                isRequired
                variant="underlined"
                onChange={(e) => setLastName(e.target.value)}
                isInvalid={touched.lastName && isInvalidLastName}
                errorMessage="Bitte geben Sie Ihren Nachnamen ein"
                color={
                  touched.lastName && isInvalidLastName ? "danger" : "default"
                }
                onBlur={() => setTouched({ ...touched, lastName: true })}
              />
              <Input
                label="E-Mail"
                defaultValue={data.email}
                isRequired
                errorMessage="Bitte geben Sie eine gültige E-Mail-Adresse ein"
                variant="underlined"
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={touched.email && isInvalidEmail}
                color={touched.email && isInvalidEmail ? "danger" : "default"}
                onBlur={() => setTouched({ ...touched, email: true })}
              />
              <Select
                label="Rolle"
                variant="underlined"
                defaultSelectedKeys={[data.role]}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Anrede"
                variant="underlined"
                defaultSelectedKeys={[data.designation]}
                onChange={(e) => setDesignationValue(e.target.value)}
              >
                {designation.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              {designationValue === "COMPANY" && (
                <Input
                  label="Unternehmen"
                  defaultValue={data.companyName}
                  isRequired
                  errorMessage="Bitte geben Sie den Firmennamen ein"
                  variant="underlined"
                  onChange={(e) => setCompanyName(e.target.value)}
                  isInvalid={touched.companyName && isInvalidCompanyName}
                  color={
                    touched.companyName && isInvalidCompanyName
                      ? "danger"
                      : "default"
                  }
                  onBlur={() => setTouched({ ...touched, companyName: true })}
                />
              )}
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  defaultSelected={data.activated}
                  onChange={(e) => setActivated(e.target.checked)}
                >
                  Aktiviert
                </Checkbox>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                isDisabled={!isFormValid}
                onPress={handleSave}
                className="cursor-pointer"
              >
                Speichern
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;

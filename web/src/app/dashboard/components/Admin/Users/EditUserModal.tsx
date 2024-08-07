import React, { use, useEffect, useState } from "react";
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
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(data.role);
  const [designationValue, setDesignationValue] = useState(data.designation);
  const [companyName, setCompanyName] = useState(data.companyName || "");
  const [activated, setActivated] = useState(data.activated);

  const apiClient = new ApiClient();

  useEffect(() => {
    const updatedUser = {
      firstName,
      lastName,
      email,
      role,
      designation: designationValue,
      companyName: designationValue === "COMPANY" ? companyName : "",
      activated,
    };
    console.log("updatedUser", updatedUser);
  }, [
    firstName,
    lastName,
    email,
    role,
    designationValue,
    companyName,
    activated,
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
      await apiClient.user.helper.updateUser(data.id, updatedUser);
      toast.success("Benutzer erfolgreich aktualisiert");
      onOpenChange(false);
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
                errorMessage="Bitte geben Sie den Vornamen ein"
                variant="underlined"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                label="Nachname"
                defaultValue={data.lastName}
                isRequired
                errorMessage="Bitte geben Sie den Nachnamen ein"
                variant="underlined"
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                label="E-Mail"
                defaultValue={data.email}
                isRequired
                errorMessage="Bitte geben Sie eine gültige E-Mail-Adresse ein"
                variant="underlined"
                onChange={(e) => setEmail(e.target.value)}
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

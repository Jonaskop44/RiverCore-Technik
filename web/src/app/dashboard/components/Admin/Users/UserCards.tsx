import { User } from "@/types/user";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import EditUserModal from "./EditUserModal";
import { useEffect, useState } from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { toast } from "sonner";
import { useUserStore } from "@/data/userStore";

interface UserCardProps {
  data: User[];
  onUserDelete: (id: number) => void;
  onUserUpdate: () => void;
}

const UserCards: React.FC<UserCardProps> = ({
  data,
  onUserDelete,
  onUserUpdate,
}) => {
  const [user, setUser] = useState<User>(null);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [confirmationTimer, setConfirmationTimer] =
    useState<NodeJS.Timeout | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { getProfilePicture } = useUserStore();
  const [profilePictures, setProfilePictures] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const fetchProfilePictures = async () => {
      const pictures: { [key: number]: string } = {};
      for (const person of data) {
        const pictureUrl = await getProfilePicture(person);
        pictures[person.id] = pictureUrl;
      }
      setProfilePictures(pictures);
    };

    fetchProfilePictures();
  }, [data, getProfilePicture]);

  const handleUserDelete = (id: number) => {
    if (deletingUserId === id) {
      onUserDelete(id);
      setDeletingUserId(null);

      // Clear the confirmation timer to prevent the "Löschbestätigung abgelaufen" message
      if (confirmationTimer) {
        clearTimeout(confirmationTimer);
        setConfirmationTimer(null);
      }
    } else {
      setDeletingUserId(id);
      toast.info(
        "Bestätigen Sie die Löschung des Benutzers durch erneutes Klicken auf Löschen"
      );
      const timer = setTimeout(() => {
        setDeletingUserId(null);
        toast.info("Löschbestätigung abgelaufen");
      }, 5000);
      setConfirmationTimer(timer);
    }
  };

  return (
    <>
      {user && (
        <EditUserModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          data={user}
          onUserUpdate={onUserUpdate}
        />
      )}
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data.map((person) => (
          <li
            key={person.email}
            className="col-span-1 bg-white dark:bg-blacksection shadow-md rounded-lg divide-y divide-gray-200 dark:divide-[#3f3f46]"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-900 dark:text-gray-200 text-sm font-medium truncate">
                    {person.firstName} {person.lastName}
                  </h3>
                  <span
                    className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                      person.activated
                        ? "text-green-800 bg-green-100"
                        : "text-red-800 bg-red-100"
                    }`}
                  >
                    {person.activated ? "Aktiviert" : "Deaktiviert"}
                  </span>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">
                  {person.email}
                </p>
              </div>
              <Avatar
                src={profilePictures[person.id]}
                alt={`${person.firstName} ${person.lastName}`}
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200 dark:divide-[#3f3f46]">
                <div className="-ml-px w-0 flex-1 flex">
                  <button
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
                    onClick={() => {
                      setUser(person);
                      onOpen();
                    }}
                  >
                    <RiEdit2Fill
                      className="w-5 h-5 text-gray-400 dark:text-gray-300 "
                      aria-hidden="true"
                    />
                    <span className="ml-3">Bearbeiten</span>
                  </button>
                </div>
                <div className="w-0 flex-1 flex">
                  <button
                    onClick={() => handleUserDelete(person.id)}
                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
                  >
                    <MdDelete
                      className="w-5 h-5 text-gray-400 dark:text-gray-300"
                      aria-hidden="true"
                    />
                    <span className="ml-3">
                      {deletingUserId === person.id ? "Bestätigen" : "Löschen"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserCards;

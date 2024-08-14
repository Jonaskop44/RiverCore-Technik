import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { Review } from "@/types/reviews";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { IoMdStopwatch } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useUserStore } from "@/data/userStore";
import { useEffect, useState } from "react";

interface ReviewCardsProps {
  data: Review[];
  selectedFilter: string;
  onStatusUpdate: (reviewId: number, status: string) => void;
  onBlockAuthor: (reviewId: number) => void;
}

const ReviewCards: React.FC<ReviewCardsProps> = ({
  data,
  selectedFilter,
  onStatusUpdate,
  onBlockAuthor,
}) => {
  const { getProfilePicture } = useUserStore();
  const [profilePictures, setProfilePictures] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const fetchProfilePictures = async () => {
      const pictures: { [key: number]: string } = {};
      for (const person of data) {
        const pictureUrl = await getProfilePicture(person);
        pictures[person.author.user.id] = pictureUrl;
      }
      setProfilePictures(pictures);
    };

    fetchProfilePictures();
  }, [data, getProfilePicture]);

  const renderButtons = (item: Review) => {
    if (selectedFilter === "Pending") {
      return (
        <>
          <div className="-ml-px w-0 flex-1 flex">
            <button
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
              onClick={() => onStatusUpdate(item.id, "ACCEPTED")}
            >
              <FaRegCheckCircle
                className="text-gray-400 dark:text-gray-300"
                aria-hidden="true"
                size={20}
              />
              <span className="ml-3">Akzeptieren</span>
            </button>
          </div>
          <div className="w-0 flex-1 flex">
            <button
              onClick={() => onStatusUpdate(item.id, "REJECTED")}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
            >
              <FaRegCircleXmark
                className="text-gray-400 dark:text-gray-300"
                aria-hidden="true"
                size={20}
              />
              <span className="ml-3">Ablehnen</span>
            </button>
          </div>
        </>
      );
    } else if (selectedFilter === "Accepted") {
      return (
        <>
          <div className="-ml-px w-0 flex-1 flex">
            <button
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
              onClick={() => onStatusUpdate(item.id, "PENDING")}
            >
              <IoMdStopwatch
                className="text-gray-400 dark:text-gray-300"
                aria-hidden="true"
                size={25}
              />
              <span className="ml-3">Ausstehend</span>
            </button>
          </div>
          <div className="w-0 flex-1 flex">
            <button
              onClick={() => onStatusUpdate(item.id, "REJECTED")}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
            >
              <FaRegCircleXmark
                className="text-gray-400 dark:text-gray-300"
                aria-hidden="true"
                size={20}
              />
              <span className="ml-3">Ablehnen</span>
            </button>
          </div>
        </>
      );
    } else if (selectedFilter === "Rejected") {
      return (
        <>
          <div className="-ml-px w-0 flex-1 flex">
            <button
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
              onClick={() => onStatusUpdate(item.id, "PENDING")}
            >
              <IoMdStopwatch
                className="text-gray-400 dark:text-gray-300"
                aria-hidden="true"
                size={25}
              />
              <span className="ml-3">Ausstehend</span>
            </button>
          </div>
          <div className="w-0 flex-1 flex">
            <button
              onClick={() => onStatusUpdate(item.id, "ACCEPTED")}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
            >
              <FaRegCheckCircle
                className="text-gray-400 dark:text-gray-300"
                aria-hidden="true"
                size={20}
              />
              <span className="ml-3">Akzeptiert</span>
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data.map((item) => (
          <li
            key={item.id}
            className="col-span-1 bg-white dark:bg-blacksection shadow-md rounded-lg divide-y divide-gray-200 dark:divide-[#3f3f46]"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-900 dark:text-gray-200 text-sm font-medium truncate">
                    {item.author.user.firstName} {item.author.user.lastName}
                  </h3>
                  <span className="flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full text-blue-800 bg-blue-100">
                    {item.author.user.designation === "COMPANY"
                      ? item.author.user.companyName
                      : "Privatperson"}
                  </span>
                  <div className="pl-25">
                    <Dropdown
                      showArrow
                      backdrop="blur"
                      radius="sm"
                      classNames={{
                        base: "before:bg-default-200",
                        content:
                          "p-0 border-small border-divider bg-background dark:bg-blacksection",
                      }}
                    >
                      <DropdownTrigger>
                        <Avatar
                          src={profilePictures[item.author.user.id]}
                          alt={`${item.author.user.firstName} ${item.author.user.lastName}`}
                        />
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Custom item styles"
                        disabledKeys={["profile"]}
                        className="p-3"
                        itemClasses={{
                          base: [
                            "rounded-md",
                            "text-default-500",
                            "transition-opacity",
                            "data-[hover=true]:text-foreground",
                            "data-[hover=true]:bg-default-100",
                            "dark:data-[hover=true]:bg-white/10",
                            "data-[selectable=true]:focus:bg-default-50",
                            "data-[pressed=true]:opacity-70",
                            "data-[focus-visible=true]:ring-default-500",
                          ],
                        }}
                      >
                        <DropdownSection aria-label="Profile & Actions">
                          <DropdownItem
                            isReadOnly
                            key="profile"
                            className="h-14 gap-2 opacity-100"
                          >
                            <User
                              name={`${item.author.user.firstName} ${item.author.user.lastName}`}
                              description={item.author.user.email}
                              classNames={{
                                name: "text-default-600",
                                description: "text-default-500",
                              }}
                              avatarProps={{
                                size: "sm",
                                src: profilePictures[item.author.user.id],
                              }}
                            />
                          </DropdownItem>
                          <DropdownItem
                            key="dashboard"
                            onPress={() => onBlockAuthor(item.author.id)}
                          >
                            Blockieren
                          </DropdownItem>
                        </DropdownSection>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <div className="flex items-center mt-1.5">
                  {Array.from({ length: 5 }, (_, i) => {
                    const starValue = i + 1;
                    return starValue <= item.rating ? (
                      <IoStar key={i} className="text-primary" />
                    ) : starValue - 0.5 === item.rating ? (
                      <IoStarHalf key={i} className="text-primary" />
                    ) : (
                      <IoStarOutline key={i} className="text-primary" />
                    );
                  })}
                </div>
                <p className="mt-1 text-gray-800 dark:text-gray-300 text-sm truncate">
                  {item.title}
                </p>
                <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm truncate">
                  {item.content}
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200 dark:divide-[#3f3f46]">
                {renderButtons(item)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReviewCards;

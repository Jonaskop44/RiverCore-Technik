import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { Avatar } from "@nextui-org/react";
import { Review } from "@/types/reviews";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import ApiClient from "@/api";

interface ReviewCardsProps {
  data: Review[];
}

const ReviewCards: React.FC<ReviewCardsProps> = ({ data }) => {
  const apiClient = new ApiClient();

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
                    <Avatar
                      src=""
                      alt={`${item.author.user.firstName} ${item.author.user.lastName}`}
                    />
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
                <p className="mt-1 text-gray-800 text-sm truncate">
                  {item.title}
                </p>
                <p className="mt-1 text-gray-500 text-sm truncate">
                  {item.content}
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200 dark:divide-[#3f3f46]">
                <div className="-ml-px w-0 flex-1 flex">
                  <button
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
                    onClick={() => {}}
                  >
                    <RiEdit2Fill
                      className="w-5 h-5 text-gray-400 dark:text-gray-300 "
                      aria-hidden="true"
                    />
                    <span className="ml-3">Akzeptieren</span>
                  </button>
                </div>
                <div className="w-0 flex-1 flex">
                  <button
                    onClick={() => {}}
                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
                  >
                    <MdDelete
                      className="w-5 h-5 text-gray-400 dark:text-gray-300"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Ablehnen</span>
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

export default ReviewCards;

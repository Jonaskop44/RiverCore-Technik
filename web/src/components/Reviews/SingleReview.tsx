import { useUserStore } from "@/data/userStore";
import { Review } from "@/types/reviews";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const SingleTestimonial = ({ review }: { review: Review }) => {
  const { getProfilePicture } = useUserStore();
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const pictureUrl = await getProfilePicture(review.author.user);
      if (pictureUrl) {
        setProfilePictureUrl(pictureUrl);
      }
    };

    fetchProfilePicture();
  }, [review.author.user, getProfilePicture]);

  return (
    <div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none">
      <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div>
          <h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
            {review.author.user.firstName} {review.author.user.lastName}
          </h3>
          <p>
            {review.author.user.designation === "COMPANY"
              ? review.author.user.companyName
              : "Privatperson"}
          </p>
          {/* <!-- Stars from one to five --> */}
          <div className="flex items-center mt-1.5">
            {Array.from({ length: 5 }, (_, i) => {
              const starValue = i + 1;
              return starValue <= review.rating ? (
                <IoStar key={i} className="text-primary" />
              ) : starValue - 0.5 === review.rating ? (
                <IoStarHalf key={i} className="text-primary" />
              ) : (
                <IoStarOutline key={i} className="text-primary" />
              );
            })}
          </div>
        </div>
        <Avatar
          src={profilePictureUrl}
          size="lg"
          alt={review.author.user.firstName}
        />
      </div>

      <p>{review.body}</p>
    </div>
  );
};

export default SingleTestimonial;

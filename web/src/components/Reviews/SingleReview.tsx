import { Reviews } from "@/types/reviews";
import Image from "next/image";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const SingleTestimonial = ({ review }: { review: Reviews }) => {
  const { name, designation, image, content } = review;
  return (
    <div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none">
      <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div>
          <h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
            {name}
          </h3>
          <p>{designation}</p>
          {/* <!-- Stars from one to five --> */}
          <div className="flex items-center mt-1.5">
            <IoStar className="text-primary" />
            <IoStar className="text-primary" />
            <IoStar className="text-primary" />
            <IoStarHalf className="text-primary" />
            <IoStarOutline className="text-primary" />
          </div>
        </div>
        <Image
          width={60}
          height={50}
          className="max-w-[60px] max-h-[60px]"
          src={image}
          alt={name}
        />
      </div>

      <p>{content}</p>
    </div>
  );
};

export default SingleTestimonial;

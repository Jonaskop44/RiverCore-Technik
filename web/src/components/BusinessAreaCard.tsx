import React from "react";

interface BusinessAreaCardProps {
  title: string;
  description: string;
  icon: string;
}

const BusinessAreaCard: React.FC<BusinessAreaCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="">
      <div className="bg-[#f3f3f3] p-4 text-whtie rounded-xl flex flex-col justify-center items-center">
        <img src="/gifs/ezgif-4-69a4d9ee08.gif" alt="" />
        <h1 className="text-sky-600 font-semibold text-lg">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default BusinessAreaCard;

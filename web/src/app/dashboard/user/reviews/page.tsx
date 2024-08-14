"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import ReviewUserForm from "../../components/User/Review/ReviewForm";

const UserReviews = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Bewertungen" />

      <div className="bg-white p-4 rounded-lg">
        <ReviewUserForm />
      </div>
    </div>
  );
};

export default UserReviews;

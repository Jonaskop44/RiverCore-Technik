"use client";

import ApiClient from "@/api";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Review } from "@/types/reviews";
import { useEffect, useState } from "react";
import ReviewCards from "../../components/Admin/Reviews/ReviewCards";
import FilterTabs from "../../components/Admin/Reviews/FilterTabs";

const AdminEditReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("Pending");
  const [selectedReview, setSelectedReview] = useState<Review>(null);
  const apiClient = new ApiClient();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await apiClient.reviews.helper.getAllReviews();
      setReviews(response.data);
    };

    fetchReviews();
  }, []);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleReviewSelect = (review: Review) => {
    setSelectedReview(review);
  };

  const filteredReviews = reviews.filter((review) => {
    if (selectedFilter === "Pending") return review.status === "PENDING";
    if (selectedFilter === "Accepted") return review.status === "ACCEPTED";
    if (selectedFilter === "Rejected") return review.status === "REJECTED";
  });

  const reviewsToShow = selectedReview ? [selectedReview] : filteredReviews;

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Bewertungen" />

      <div className="flex bg-white dark:bg-blacksection rounded-lg pb-4 mb-10 sm:space-x-60 md:space-x-5 lg:space-x-60 shadow-md">
        <FilterTabs data={reviews} onFilterChange={handleFilterChange} />
      </div>

      <ReviewCards data={reviewsToShow} selectedFilter={selectedFilter} />
    </div>
  );
};

export default AdminEditReviews;

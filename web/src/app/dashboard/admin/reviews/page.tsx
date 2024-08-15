/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ApiClient from "@/api";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Review } from "@/types/reviews";
import { useEffect, useState } from "react";
import ReviewCards from "../../components/Admin/Reviews/ReviewCards";
import FilterTabs from "../../components/Admin/Reviews/FilterTabs";
import { toast } from "sonner";

const AdminEditReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("Pending");
  const apiClient = new ApiClient();

  const fetchReviews = async () => {
    const response = await apiClient.reviews.helper.getAllReviews();
    setReviews(response.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleStatusUpdate = async (reviewId: number, status: string) => {
    const response = await apiClient.reviews.helper.updateReviewStatus(
      reviewId,
      status
    );
    if (response.status) {
      await fetchReviews();
      toast.success("Die Bewertung wurde erfolgreich aktualisiert.");
    } else {
      toast.error("Die Bewertung konnte nicht aktualisiert werden.");
    }
  };

  const handleBlockAuthor = async (authorId: number) => {
    const reponse = await apiClient.reviews.helper.updateAuthor(authorId);

    if (reponse.status) {
      await fetchReviews();
      if (reponse.data.blocked) {
        toast.success("Der Autor wurde erfolgreich blockiert.");
      } else {
        toast.success("Der Autor wurde erfolgreich freigeschaltet.");
      }
    } else {
      toast.error("Der Autor konnte nicht blockiert werden.");
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (selectedFilter === "Pending") return review.status === "PENDING";
    if (selectedFilter === "Accepted") return review.status === "ACCEPTED";
    if (selectedFilter === "Rejected") return review.status === "REJECTED";
  });

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Bewertungen" />
      <div className="flex bg-white dark:bg-blacksection rounded-lg pb-4 mb-10 shadow-md">
        <FilterTabs data={reviews} onFilterChange={handleFilterChange} />
      </div>

      <ReviewCards
        data={filteredReviews}
        selectedFilter={selectedFilter}
        onStatusUpdate={handleStatusUpdate}
        onBlockAuthor={handleBlockAuthor}
      />
    </div>
  );
};

export default AdminEditReviews;

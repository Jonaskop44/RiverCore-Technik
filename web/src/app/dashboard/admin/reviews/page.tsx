import ApiClient from "@/api";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useEffect } from "react";

const AdminEditReviews = () => {
  const apiClient = new ApiClient();

  useEffect(() => {
    const fetchReviews = async () => {};
  });

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Benutzerverwaltung" />
    </div>
  );
};

export default AdminEditReviews;

"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import NewsletterEditor from "../../components/Admin/Newsletter/NewsletterEditor";

const NewsletterPage = () => {
  return (
    <>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Newsletter" />
        <NewsletterEditor />
      </div>
    </>
  );
};

export default NewsletterPage;

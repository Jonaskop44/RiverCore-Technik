"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import ReviewUserForm from "../../components/User/Review/ReviewForm";
import { motion } from "framer-motion";

const UserReviews = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Bewertung" />

      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.35 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-black p-4 rounded-lg"
      >
        <ReviewUserForm />
      </motion.div>
    </div>
  );
};

export default UserReviews;

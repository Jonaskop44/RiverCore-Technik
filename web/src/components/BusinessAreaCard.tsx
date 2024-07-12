/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const sections = [
  {
    title: "Apple for Business",
    description: "Die Power von Apple. Bei der Arbeit.",
    icon: "/gifs/ezgif-4-5cd71fc405.gif",
  },
  {
    title: "Modern Workplace",
    description: "Eine Rundum-Lösung für den Arbeitsplatz der Zukunft.",
    icon: "/gifs/ezgif-4-69a4d9ee08.gif",
  },
  {
    title: "Apple for Business",
    description: "Die Power von Apple. Bei der Arbeit.",
    icon: "/gifs/ezgif-4-5cd71fc405.gif",
  },
  {
    title: "Modern Workplace",
    description: "Eine Rundum-Lösung für den Arbeitsplatz der Zukunft.",
    icon: "/gifs/ezgif-4-69a4d9ee08.gif",
  },
  {
    title: "Apple for Business",
    description: "Die Power von Apple. Bei der Arbeit.",
    icon: "/gifs/ezgif-4-5cd71fc405.gif",
  },
  {
    title: "Modern Workplace",
    description: "Eine Rundum-Lösung für den Arbeitsplatz der Zukunft.",
    icon: "/gifs/ezgif-4-69a4d9ee08.gif",
  },
];

const BusinessSections = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          } else {
            controls.start("hidden");
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const container = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div ref={ref} className="container mx-auto p-8">
      <h1 className="text-3xl mb-8 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-500">
        Unsere Geschäftsbereiche
      </h1>
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {sections.map((section) => (
          <motion.div
            key={section.title}
            variants={item}
            className="bg-[#f3f3f3] p-6 rounded-lg shadow-lg text-center"
          >
            <img
              src={section.icon}
              alt={section.title}
              className="mx-auto mb-4 w-12 h-12"
            />
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              {section.title}
            </h2>
            <p className="text-gray-700">{section.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BusinessSections;

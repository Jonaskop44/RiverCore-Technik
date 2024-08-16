import Link from "next/link";
import { motion } from "framer-motion";

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const parts = pageName.split("/");

  return (
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
      transition={{ duration: 1, delay: 0.2 }}
      viewport={{ once: true }}
      className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        {pageName.split("/")[0]}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          {parts.map((name, index) => (
            <li key={index}>
              {index === parts.length - 1 ? (
                <span className="font-medium text-primary">{name}</span>
              ) : (
                <Link className="font-medium" href={`/${name}`}>
                  {name} /
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </motion.div>
  );
};

export default Breadcrumb;

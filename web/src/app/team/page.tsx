import SectionHeader from "@/components/Common/SectionHeader";
import { motion } from "framer-motion";

const Team = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <SectionHeader
          headerInfo={{
            title: "Impressum".toUpperCase(),
            subtitle: "Informationen gemäß § 5 TMG",
            description: `Ob Fragen, Anregungen oder Kritik – wir freuen uns über Ihre Nachricht und helfen Ihnen gerne weiter.`,
          }}
        />
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -10,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Team;

"use client";

import SectionHeader from "@/components/Common/SectionHeader";
import { motion } from "framer-motion";

const Impressum = () => {
  return (
    <div className="flex justify-center items-center h-screen mt-36">
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
          className="mt-5 animate_top rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5 max-w-96
          "
        >
          <div>
            <h1 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
              VERANWORTLICH FÜR DEN INHALT
            </h1>

            <p>
              ELBE GmbH
              <br />
              Elektronische Büroeinrichtung
              <br />
              Tirolerstraße 21
              <br />
              A-9500 Villach
            </p>
            <p className="mt-5">
              Geschäftsführer: Maximilian Fleissner, Gert Schwanter
            </p>
            <p className="mt-5">
              Tel.: 04242/51115
              <br />
              Fax: 04242/51115-85
              <br />
              Kontakt: <a href="mailto:office@elbe.at">office@elbe.at</a>
              <br />
              Firmenbuchnummer: 428798k
              <br />
              Zuständiges Gericht: Landesgericht Klagenfurt
              <br />
              USt-ID ATU69330878
            </p>
            <h1 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
              INFORMATIONEN LT. §5 ABS 1 E-COMMERCE-GESETZ
            </h1>
            <h1 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
              Nutzungsbedingungen der Inhalte dieser Website
            </h1>
            <p>
              Die Webseiten der ELBE GmbH wurden inhaltlich sorgfältig
              erarbeitet, um zutreffende und aktuelle Informationen
              bereitzustellen. Dennoch können Fehler auftreten. Wir weisen
              darauf hin, dass die Inhalte der Website nur allgemeiner Art sind
              und wir für die Aktualität, Richtigkeit oder Vollständigkeit keine
              Gewähr übernehmen können. Der Betreiber von www.elbe.at übernimmt
              deshalb keine Garantie oder Haftung für Schäden materieller oder
              ideeller Art, die durch die Nutzung, Nichtnutzung bzw. durch
              fehlerhafte Informationen verursacht wurden. Darüber hinaus
              distanzieren wir uns hiermit ausdrücklich von allen Inhalten aller
              gelinkten Seiten auf unseren Webseiten im Internet.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Impressum;

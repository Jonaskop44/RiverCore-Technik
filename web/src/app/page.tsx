import Link from "next/link";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full overflow-x-hidden">
        <section className="relative h-[550px] overflow-hidden pb-5 pt-20 lg:h-[90vh]">
          <div className="absolute -left-8 bottom-0 -z-50 h-[120%] w-[130%] origin-top-left -rotate-6 rounded-[3rem] bg-sky-500 bg-[url('/images/start-background.webp')] bg-[length:auto_75%] bg-[-160px_140%] bg-no-repeat" />
          <div className="flex h-full w-full flex-col items-center justify-around pb-10 text-center">
            <div className="flex flex-col items-center gap-6 px-6 font-medium text-white">
              <h2 className="text-3xl md:text-4xl">
                Innovationen <b>nutzen</b>, erfolgreich <b>umsetzen</b>!
              </h2>
              <p className="w-11/12 text-lg md:w-3/5 md:text-xl lg:w-2/5">
                Bei <b>Elbe - Technik</b> bieten wir maßgeschneiderte
                Techniklösungen für Ihr Unternehmen. Kontaktieren Sie uns per
                Telefon oder E-Mail und profitieren Sie von unserer umfassenden
                Beratung und Unterstützung. Setzen Sie Ihre Projekte mit
                modernster Technik erfolgreich um!
              </p>
              <Link
                href={""}
                className="mt-8 inline-block transform rounded-full bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              >
                Mehr Erfahren
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

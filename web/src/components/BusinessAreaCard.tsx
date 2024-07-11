/* eslint-disable @next/next/no-img-element */
// components/BusinessSections.tsx

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
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl mb-8 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700  to-sky-500">
        Unsere Geschäftsbereiche
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div
            key={section.title}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessSections;

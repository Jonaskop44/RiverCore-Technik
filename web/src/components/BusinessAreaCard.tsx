import { HiOutlinePrinter } from "react-icons/hi2";

interface BusinessAreaCardProps {
  title: string;
  description: string;
  icon: string;
}

const BusinessAreaCard = () => {
  return (
    <div className="bg-[#f3f3f3] p-4 text-whtie rounded-xl flex flex-col justify-center items-center">
      <HiOutlinePrinter className="text-4xl" />
      <h1>Title</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet autem
        error aspernatur molestias, dicta distinctio perferendis cumque
        voluptatibus. Voluptatibus cum consequuntur fugiat. Enim, temporibus
        mollitia? Culpa inventore nisi tenetur temporibus.
      </p>
    </div>
  );
};

export default BusinessAreaCard;

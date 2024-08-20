"use client";

import { useUserStore } from "@/data/userStore";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Avatar,
  Button,
  Calendar,
} from "@nextui-org/react";
import { useState } from "react";
import ReviewUserForm from "./components/User/Review/ReviewForm";
import { TiWeatherCloudy } from "react-icons/ti";

const PARTNERCARDS = [
  {
    name: "Johann Doe",
    position: "Drucker Ansprechpartner",
    image: "https://via.placeholder.com/150",
    text: "Bei Fragen zu Drucker oder Kopierer wenden Sie sich bitte an mich.",
    telephone: "123456789",
  },
  {
    name: "Jane Doe",
    position: "Netzwerk Ansprechpartner",
    image: "https://via.placeholder.com/150",
    text: "Bei Fragen über das Netzwerk wenden Sie sich bitte an mich.",
    telephone: "123456789",
  },
  {
    name: "Johann Doe",
    position: "Kassen Ansprechpartner",
    image: "https://via.placeholder.com/150",
    text: "Bei Fragen über das Kasensystem wenden Sie sich bitte an mich.",
    telephone: "123456789",
  },
];

const Dashboard = () => {
  const { user, profilePicture } = useUserStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const hours = new Date().getHours();
  const timeOfDay = hours < 12 ? "Morgen" : hours < 18 ? "Tag" : "Abend";

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : PARTNERCARDS.length - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < PARTNERCARDS.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentCard = PARTNERCARDS[activeIndex];

  return (
    <div>
      <div className="grid content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Welcome Card */}
        <Card>
          <CardHeader className="flex gap-3">
            <Avatar alt={user.firstName} src={profilePicture} />
            <div className="flex flex-col">
              <p className="text-md">Guten {timeOfDay}</p>
              <p className="text-small text-default-500">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>
              Willkommen im Dashboard. Hier finden Sie alle wichtigen
              Informationen zu Ihrem Unternehmen.
            </p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://www.elbe.at/elbe-miete/"
            >
              Geräte für Ihr Unternehmen
            </Link>
          </CardFooter>
        </Card>

        {/* Partner Card */}
        <Card>
          <CardHeader className="flex gap-3">
            <Avatar alt={currentCard.name} src={currentCard.image} />
            <div className="flex flex-col">
              <p className="text-md">{currentCard.name}</p>
              <p className="text-small text-default-500">
                {currentCard.position}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>{currentCard.text}</CardBody>
          <Divider />
          <CardFooter className="flex justify-between">
            <Button variant="light" onPress={handlePrevious}>
              Zurück
            </Button>
            <Button variant="light" onPress={handleNext}>
              Weiter
            </Button>
          </CardFooter>
        </Card>

        {/* Review Form */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">Bewerte unser Unternehmen</h3>
          </CardHeader>
          <CardBody>
            <ReviewUserForm />
          </CardBody>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader className="flex gap-3">
            <TiWeatherCloudy size={24} />
            <div className="flex flex-col">
              <p className="text-md">Villach 24°</p>
              <p className="text-small text-default-500">
                Bewölkt mit Sonnenschein
              </p>
            </div>
          </CardHeader>
          <CardBody className="flex justify-center items-center">
            <Calendar showMonthAndYearPickers />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

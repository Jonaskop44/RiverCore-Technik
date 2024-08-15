"use client";

import { useUserStore } from "@/data/userStore";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

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
      <div className="grid grid-cols-3 gap-4">
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

        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">Statistik</h3>
          </CardHeader>
          <CardBody>
            <p>Statistik wird hier angezeigt.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

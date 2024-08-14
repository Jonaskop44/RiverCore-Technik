import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Button, Input, Textarea } from "@nextui-org/react";
import ApiClient from "@/api";
import { toast } from "sonner";

const ReviewUserForm = () => {
  const apiClient = new ApiClient();
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    if (title.trim() === "" || content.trim() === "") {
      toast.error("Bitte füllen Sie alle Felder aus");
      return;
    }

    const reponse = await apiClient.reviews.helper.createReview(
      title,
      rating,
      content
    );

    if (reponse.status) {
      toast.success("Ihre Bewertung wurde erfolgreich erstellt");
      setTitle("");
      setContent("");
      setRating(0);
    } else {
      toast.error("Es ist ein Fehler aufgetreten");
    }
  };

  useEffect(() => {
    console.log(rating);
    console.log(title);
    console.log(content);
  }, [rating, title, content]);

  return (
    <div>
      <form className="mt-4 space-y-4">
        <div>
          <p className="block">Bewertung</p>
          <Rating
            allowFraction
            initialValue={rating}
            onClick={handleRatingChange}
            fillColor="#006bff"
            SVGclassName="inline-block"
          />
        </div>
        <Input
          label="Titel"
          variant="underlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          label="Bewertung"
          variant="underlined"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button color="primary" onPress={handleSubmit}>
          Bewertung abschicken
        </Button>
      </form>
    </div>
  );
};

export default ReviewUserForm;

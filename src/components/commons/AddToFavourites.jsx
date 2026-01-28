import { useState } from "react";

import { Rating, RatingFilled } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import useFavouritesStore from "stores/useFavouritesStore";

const AddToFavourites = ({ Title, imdbRating, imdbID }) => {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useFavouritesStore.pick();

  const [isLiked, setIsLiked] = useState(isFavourite(imdbID));
  const { t } = useTranslation();

  const toggleFavourite = () => {
    if (isLiked) {
      removeFromFavourites(imdbID);
    } else {
      addToFavourites({
        imdbID,
        Title,
        imdbRating,
      });
    }
    setIsLiked(!isLiked);
  };

  return (
    <Button
      className="rounded-full border"
      icon={isLiked ? RatingFilled : Rating}
      style="text"
      tooltipProps={isLiked ? null : { content: t("favourites.add") }}
      onClick={toggleFavourite}
    />
  );
};

export default AddToFavourites;

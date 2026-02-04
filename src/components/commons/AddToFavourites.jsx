import { useState } from "react";

import { Rating, RatingFilled } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import useFavouritesStore from "stores/useFavouritesStore";

const AddToFavourites = ({ title, imdbRating, imdbID }) => {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useFavouritesStore.pick();

  const [isLiked, setIsLiked] = useState(isFavourite(imdbID));
  const { t } = useTranslation();

  const toggleFavourite = () => {
    setIsLiked(isLiked => {
      if (isLiked) {
        removeFromFavourites(imdbID);
      } else {
        addToFavourites({
          imdbID,
          title,
          imdbRating,
        });
      }

      return !isLiked;
    });
  };

  return (
    <Button
      icon={isLiked ? RatingFilled : Rating}
      style="text"
      tooltipProps={
        isLiked
          ? { content: t("favourites.remove") }
          : { content: t("favourites.add") }
      }
      onClick={toggleFavourite}
    />
  );
};

export default AddToFavourites;

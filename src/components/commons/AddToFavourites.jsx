import { useState } from "react";

import { Rating, RatingFilled } from "neetoicons";
import { useTranslation } from "react-i18next";
import useFavouritesStore from "stores/useFavouritesStore";

import TooltipWrapper from "./TooltipWrapper";

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
    <TooltipWrapper content={t("favourites.add")}>
      <button
        className="flex items-center rounded-full border"
        onClick={toggleFavourite}
      >
        {isLiked ? <RatingFilled /> : <Rating />}
      </button>
    </TooltipWrapper>
  );
};

export default AddToFavourites;

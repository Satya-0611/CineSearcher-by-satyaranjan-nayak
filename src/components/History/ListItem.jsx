import { useState } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Alert, Button } from "neetoui";
import { withTranslation } from "react-i18next";

const HistoryListItem = ({
  movie,
  activeMovie,
  setActiveMovie,
  deleteMovie,
  itemRefs,
  t,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handleDeleteMovie = () => {
    deleteMovie(movie);
    setIsAlertOpen(false);
  };

  return (
    <div
      key={movie}
      ref={el => (itemRefs.current[movie] = el)}
      className={classNames(
        "flex cursor-pointer justify-between rounded-xl px-4 py-3 font-medium transition-colors duration-200",
        {
          "bg-blue-600 text-white shadow-md": activeMovie === movie,
          "bg-blue-100 text-gray-700 hover:bg-blue-100": activeMovie !== movie,
        }
      )}
      onClick={() => setActiveMovie(movie)}
    >
      {movie}
      <Button
        icon={Delete}
        style="text"
        tooltipProps={{ content: t("movie.removeMovie") }}
        onClick={() => setIsAlertOpen(true)}
      />
      {isAlertOpen && (
        <Alert
          isOpen={isAlertOpen}
          message={t("history.removeMovieAlert.message")}
          submitButtonLabel="Delete"
          title={t("history.removeMovieAlert.title")}
          onClose={() => setIsAlertOpen(false)}
          onSubmit={handleDeleteMovie}
        />
      )}
    </div>
  );
};

export default withTranslation()(HistoryListItem);

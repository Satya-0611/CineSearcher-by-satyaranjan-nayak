import { useState } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Alert, Button } from "neetoui";
import { Trans } from "react-i18next";
import withT from "utils/withT";

const ListItem = ({
  movieName,
  activeMovie,
  setActiveMovie,
  deleteMovie,
  itemRefs,
  t,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handleDeleteMovie = () => {
    deleteMovie(movieName);
    setIsAlertOpen(false);
  };
  const isActiveMovie = activeMovie === movieName;

  return (
    <div
      key={movieName}
      ref={element => (itemRefs.current[movieName] = element)}
      className={classNames(
        "flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 font-medium transition-colors duration-200",
        {
          "bg-blue-600 text-white shadow-md": isActiveMovie,
          "bg-blue-100 text-gray-700 hover:bg-blue-100": !isActiveMovie,
        }
      )}
      onClick={() => setActiveMovie(movieName)}
    >
      {movieName}
      <Button
        icon={Delete}
        style="text"
        tooltipProps={{ content: t("movie.removeMovie") }}
        onClick={() => setIsAlertOpen(true)}
      />
      <Alert
        isOpen={isAlertOpen}
        message={t("history.removeAlertDescription")}
        submitButtonLabel="Delete"
        title={
          <Trans
            components={{ bold: <strong /> }}
            i18nKey="history.removeMovieAlert.title"
            tOptions={{ interpolation: { escapeValue: false } }}
            values={{ movie: movieName }}
          />
        }
        onClose={() => setIsAlertOpen(false)}
        onSubmit={handleDeleteMovie}
      />
    </div>
  );
};

export default withT(ListItem);

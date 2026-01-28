import { useEffect, useRef, useState } from "react";

import { Alert, Toastr } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useHistoryStore from "stores/useHistoryStore";

import HistoryListItem from "./ListItem";

const History = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const itemRefs = useRef({});
  const { t } = useTranslation();

  const {
    moviesHistory,
    activeMovie,
    setActiveMovie,
    removeFromMoviesHistory,
    clearAllHistory,
  } = useHistoryStore.pick();

  useEffect(() => {
    if (activeMovie && itemRefs.current[activeMovie]) {
      itemRefs.current[activeMovie].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeMovie]);

  const deleteMovie = movie => {
    removeFromMoviesHistory(movie);
  };

  const handleSubmit = () => {
    if (!isEmpty(moviesHistory)) {
      clearAllHistory();
    } else {
      Toastr.error(t("errorMessages.noHistory"));
    }
    setIsAlertOpen(false);
  };

  return (
    //history container
    <div className="mx-auto max-w-md ">
      <div className="flex px-4">
        <h2 className="w-full bg-white pb-6 pt-8 text-xl font-bold text-gray-800">
          {t("history.tabTitle")}
        </h2>
        <button
          className="font-bolder text-red-600"
          onClick={() => setIsAlertOpen(true)}
        >
          Clear&nbsp;all
        </button>
      </div>
      <div className="custom-scrollbar max-h-[400px] space-y-3 pb-20">
        {!isEmpty(moviesHistory) > 0 ? (
          moviesHistory.map(movie => (
            <HistoryListItem
              key={movie}
              {...{
                movie,
                activeMovie,
                setActiveMovie,
                deleteMovie,
                itemRefs,
              }}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">{t("history.noData")}</p>
        )}
      </div>
      <Alert
        isOpen={isAlertOpen}
        message={t("history.clearAllAlert.message")}
        size="small"
        submitButtonLabel="Delete"
        title={t("history.clearAllAlert.title")}
        onClose={() => setIsAlertOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default History;

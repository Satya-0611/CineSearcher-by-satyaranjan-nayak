import { useEffect, useRef, useState } from "react";

import { Delete } from "neetoicons";
import { Alert, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";
import useHistoryStore from "stores/useHistoryStore";

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
    console.log("called");
  };

  const handleSubmit = () => {
    if (moviesHistory.length > 0) {
      clearAllHistory();
    } else {
      Toastr.error("Movies history is empty");
    }
    setIsAlertOpen(false);
  };

  return (
    //history container
    <div className="mx-auto max-w-md ">
      <div className="flex px-4">
        <h2 className="w-full bg-white pb-6 pt-8 text-xl font-bold text-gray-800">
          {t("viewHistory")}
        </h2>
        <button
          className="font-bolder text-red-600"
          onClick={() => setIsAlertOpen(true)}
        >
          Clear&nbsp;all
        </button>
      </div>
      <div className="custom-scrollbar max-h-[400px] space-y-3 pb-20">
        {moviesHistory.length > 0 ? (
          moviesHistory.map(movie => (
            <div
              key={movie}
              ref={el => (itemRefs.current[movie] = el)}
              className={`flex cursor-pointer justify-between
                  rounded-xl
                  px-4
                  py-3 font-medium
                  transition-colors
                  duration-200
                  ${
                    activeMovie === movie
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-blue-100 text-gray-700 hover:bg-blue-100"
                  }`}
              onClick={() => setActiveMovie(movie)}
            >
              {movie}
              <Delete onClick={() => deleteMovie(movie)} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">{t("noHistory")}</p>
        )}
      </div>
      <Alert
        isOpen={isAlertOpen}
        message={t("clearAllHistoryConfirmation.message")}
        size="small"
        title={t("clearAllHistoryConfirmation.title")}
        onClose={() => setIsAlertOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default History;

import { useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { isNotEmpty } from "neetocist";
import { Alert } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";
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

  const handleSubmit = () => {
    if (isNotEmpty(moviesHistory)) {
      clearAllHistory();
    }
    setIsAlertOpen(false);
  };

  return (
    <div className="mx-auto max-w-md ">
      <div className="flex px-4">
        <h2 className="w-full bg-white pb-6 pt-8 text-xl font-bold text-gray-800">
          {t("history.tabTitle")}
        </h2>
        <button
          disabled={isEmpty(moviesHistory)}
          className={classNames("font-bolder text-red-600", {
            hidden: isEmpty(moviesHistory),
          })}
          onClick={() => setIsAlertOpen(true)}
        >
          {t("history.clearAllBtn")}
        </button>
      </div>
      <div className="custom-scrollbar space-y-3 pb-5">
        {isNotEmpty(moviesHistory) > 0 ? (
          moviesHistory.map(movieName => (
            <HistoryListItem
              key={movieName}
              {...{
                movieName,
                activeMovie,
                setActiveMovie,
                deleteMovie: removeFromMoviesHistory,
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
        message={t("history.removeAlertDescription")}
        size="small"
        submitButtonLabel="Delete"
        title={
          <Trans
            components={{ bold: <strong /> }}
            i18nKey={t("history.clearAllAlert.title")}
          />
        }
        onClose={() => setIsAlertOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default History;

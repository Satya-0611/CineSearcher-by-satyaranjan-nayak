import { useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";
import useHistoryStore from "stores/useHistoryStore";

const History = () => {
  const { moviesHistory, activeMovie, setActiveMovie } = useHistoryStore();
  const itemRefs = useRef({});
  const { t } = useTranslation();

  useEffect(() => {
    if (activeMovie && itemRefs.current[activeMovie]) {
      itemRefs.current[activeMovie].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeMovie]);

  return (
    //history container
    <div className="mx-auto max-w-md">
      <div className="custom-scrollbar max-h-[400px] space-y-3 pb-20">
        {moviesHistory.length > 0 ? (
          moviesHistory.map(movie => (
            <div
              key={movie}
              ref={el => (itemRefs.current[movie] = el)}
              // 3. & 4. Styling logic for Active vs Inactive items
              className={`cursor-pointer rounded-xl
                  px-4
                  py-3
                  text-center
                  font-medium transition-colors
                  duration-200
                  ${
                    activeMovie === movie
                      ? "bg-blue-600 text-white shadow-md" // Active State: Specific Blue + White Text
                      : "bg-blue-100 text-gray-700 hover:bg-blue-100" // Default State: Specific Light Blue
                  }`}
              onClick={() => setActiveMovie(movie)}
            >
              {movie}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">{t("noHistory")}</p>
        )}
      </div>
    </div>
  );
};

export default History;

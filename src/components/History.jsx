import { useState } from "react";

import useHistoryStore from "stores/useHistoryStore";

const History = () => {
  const history = useHistoryStore(store => store.moviesHistory);
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    //history container
    <div className="mx-auto max-w-md">
      <h2 className="sticky top-0 w-full bg-white pb-4 pt-8 text-center text-xl font-bold text-gray-800">
        View history
      </h2>
      <div className="custom-scrollbar max-h-[400px] space-y-3 pb-20">
        {history.length > 0 ? (
          history.map((movie, index) => (
            <div
              key={movie}
              // 3. & 4. Styling logic for Active vs Inactive items
              className={`cursor-pointer rounded-xl
                px-4
                py-3
                text-center
                font-medium transition-colors
                duration-200
                ${
                  activeIndex === index
                    ? "bg-blue-600 text-white shadow-md" // Active State: Specific Blue + White Text
                    : "bg-blue-100 text-gray-700 hover:bg-blue-100" // Default State: Specific Light Blue
                }`}
              onClick={() => setActiveIndex(index)}
            >
              {movie}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No history found</p>
        )}
      </div>
    </div>
  );
};

export default History;

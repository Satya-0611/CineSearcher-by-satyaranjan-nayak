import { useState, useEffect } from "react";

const useDebounce = searchKey => {
  const [debounceKey, setDebounceKey] = useState(searchKey);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceKey(searchKey);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchKey]);

  return debounceKey;
};

export default useDebounce;

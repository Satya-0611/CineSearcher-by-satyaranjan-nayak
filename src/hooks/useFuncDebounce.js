import { useRef } from "react";

const useFuncDebounce = func => {
  const funcRef = useRef(null);
  const debouncedFunc = (...args) => {
    clearTimeout(funcRef.current);
    funcRef.current = setTimeout(() => func(...args), 500);
  };

  return debouncedFunc;
};

export default useFuncDebounce;

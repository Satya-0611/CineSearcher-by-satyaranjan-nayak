import { useEffect, useRef } from "react";

const useKeyboardNavigation = () => {
  const focusRef = useRef(null);
  const handleFocusRef = e => {
    if (e.key === "/") {
      e.preventDefault();
      focusRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleFocusRef);

    return () => document.removeEventListener("keydown", handleFocusRef);
  }, []);

  return focusRef;
};

export default useKeyboardNavigation;

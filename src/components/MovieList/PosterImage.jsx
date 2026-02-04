import { useEffect, useState } from "react";

import { DEFAULT_IMAGE } from "./constants";

const PosterImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    if (src === "N/A" || !src) {
      setImageSrc(DEFAULT_IMAGE);
    } else {
      setImageSrc(src);
    }
  }, [src]);

  return (
    <img
      alt={alt}
      className={className}
      src={imageSrc}
      onError={() => setImageSrc(DEFAULT_IMAGE)}
    />
  );
};

export default PosterImage;

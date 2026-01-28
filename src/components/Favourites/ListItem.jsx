import React from "react";

import { Typography } from "neetoui";

const FavouriteListItem = ({ Title, imdbRating }) => (
  <div className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-[#f9f9f9] px-6 py-5 transition-colors hover:bg-gray-100">
    <div className="flex-1 pr-4">
      <Typography
        className="text-left text-gray-900"
        style="h4"
        weight="semibold"
      >
        {Title}
      </Typography>
    </div>
    <div className="flex items-center gap-2">
      <Typography className="text-gray-500" style="body2">
        Rating:
      </Typography>
      <Typography className="text-gray-900" style="body2" weight="semibold">
        {imdbRating || "N/A"}/10
      </Typography>
    </div>
  </div>
);

export default FavouriteListItem;

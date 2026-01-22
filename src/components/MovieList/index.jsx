import { useState } from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";

const ShowMovies = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="flex h-screen flex-col">
      <Input
        className="mx-8 my-4"
        placeholder="Search for movies"
        prefix={<Search />}
        type="search"
        value={searchKey}
        onChange={e => {
          setSearchKey(e.target.value);
        }}
      />
    </div>
  );
};

export default ShowMovies;

import History from "components/History";
import MovieList from "components/MovieList";

const MovieListPage = () => (
  // Parent container
  <div className="flex h-screen overflow-hidden bg-gray-50">
    {/* left side - movie list */}
    <div className="flex-1 overflow-y-auto p-8">
      <MovieList />
    </div>
    {/* right side - history */}
    <div className="z-20 flex h-full w-96 flex-col border-l border-gray-200 bg-white shadow-xl">
      <h2 className="w-full shrink-0 bg-white pb-4 pt-8 text-center text-xl font-bold text-gray-800">
        View history
      </h2>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <History />
      </div>
    </div>
  </div>
);

export default MovieListPage;

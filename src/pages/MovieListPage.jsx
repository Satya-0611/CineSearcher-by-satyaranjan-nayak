import History from "components/History";
import MovieList from "components/MovieList";

const MovieListPage = () => (
  <div className="flex h-full overflow-hidden bg-gray-50">
    <div className="flex-1 overflow-y-auto p-8">
      <MovieList />
    </div>
    <div className="z-20 flex h-full w-4/12 flex-col border-l border-gray-200 bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <History />
      </div>
    </div>
  </div>
);

export default MovieListPage;

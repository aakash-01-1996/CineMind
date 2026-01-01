import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-4 font-serif text-white">
        {title}
      </h1>
      <div className="flex overflow-x-scroll scrollbar-hide">
        <div className="flex ">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

import React, { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, movie }) => {
  const [showInfo, setShowInfo] = useState(false);

  if (!posterPath) return null;

  return (
    <div
      className="w-36 md:w-48 pr-4 cursor-pointer relative group"
      onClick={() => setShowInfo(!showInfo)}
    >
      <img
        alt={movie?.title || "Movie Card"}
        src={IMG_CDN_URL + posterPath}
        className="rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 pr-4 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black bg-opacity-80 w-full p-2 rounded-b-lg">
          <p className="text-white text-xs md:text-sm font-semibold truncate">
            {movie?.title || movie?.original_title}
          </p>
          <p className="text-gray-400 text-xs">
            ⭐ {movie?.vote_average?.toFixed(1)}
          </p>
        </div>
      </div>
      {/* Selected state modal */}
      {showInfo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(false);
          }}
        >
          <div
            className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w780${movie?.backdrop_path || posterPath}`}
                alt={movie?.title}
                className="w-full h-48 md:h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setShowInfo(false)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
                {movie?.title || movie?.original_title}
              </h2>
              <div className="flex gap-4 text-gray-400 text-sm mb-3">
                <span>⭐ {movie?.vote_average?.toFixed(1)}</span>
                <span>📅 {movie?.release_date?.split("-")[0]}</span>
                <span>🗳️ {movie?.vote_count} votes</span>
              </div>
              <p className="text-gray-300 text-sm md:text-base">
                {movie?.overview || "No description available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;

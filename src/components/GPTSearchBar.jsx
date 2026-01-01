import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search movies using TMDB API
  const searchMovieTMDB = async (query) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(query) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  // Get movie recommendations from TMDB based on a movie ID
  const getRecommendations = async (movieId) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  // Get similar movies from TMDB
  const getSimilarMovies = async (movieId) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleSearchClick = async () => {
    const query = searchText.current.value?.trim();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      // First, search for movies matching the query
      const searchResults = await searchMovieTMDB(query);

      if (!searchResults || searchResults.length === 0) {
        setError("No movies found. Try a different search term.");
        setLoading(false);
        return;
      }

      // Get the first result to find recommendations
      const firstMovie = searchResults[0];
      
      // Fetch recommendations and similar movies
      const [recommendations, similarMovies] = await Promise.all([
        getRecommendations(firstMovie.id),
        getSimilarMovies(firstMovie.id),
      ]);

      // Create categorized results
      const movieNames = [
        `Search Results: "${query}"`,
        `Recommended for "${firstMovie.title}"`,
        `Similar to "${firstMovie.title}"`,
      ];

      const movieResults = [
        searchResults.slice(0, 10),
        recommendations.slice(0, 10),
        similarMovies.slice(0, 10),
      ];

      dispatch(addGPTMovieResult({ movieNames, movieResults }));
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if langKey exists in lang object, otherwise fallback to a default language
  const selectedLang = lang[langKey] ? langKey : "en";

  return (
    <div className="pt-[32%] md:p-0 md:pt-[10%] flex flex-col items-center">
      <form
        className="w-3/4 md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg"
          placeholder={lang[selectedLang].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 disabled:opacity-50"
          onClick={handleSearchClick}
          disabled={loading}
        >
          {loading ? "..." : lang[selectedLang].search}
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-4 bg-black bg-opacity-75 px-4 py-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default GPTSearchBar;

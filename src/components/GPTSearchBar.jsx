import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // USe TMDB API for each movie
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  const handleGPTSSearchClick = async () => {
    console.log(searchText.current.value);

    //Make API call to OpenAI library with the input text in the search bar and display movie resuts

    const gptQuery =
      "Act as a Movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". only give me names of 7 movies, comma separated like the example result given ahead. Example Result: Gravity, Interstellar, Avengers, Spirderman, Dhamaka, Freddy, Mr.Bean Holidays";

    const GPTResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!GPTResults.choices) {
      //ToDo: Write Error Handling
    }
    console.log(GPTResults.choices[0]?.message?.content);

    // List of 7 movies
    const gptMovies = GPTResults.choices[0]?.message?.content.split(",");

    // Movies return in array..[]
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // result will be arr of promises [promise, promise,promise,promise,promise,promise,promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGPTMovieResult({ movieNames: gptMovies, movieResult: tmdbResults })
    );
  };

  // Check if langKey exists in lang object, otherwise fallback to a default language
  const selectedLang = lang[langKey] ? langKey : "en";

  return (
    <div className="pt-[32%] md:p-0 md:pt-[10%] flex justify-center">
      <form
        className="w-3/4 md:w-1/2  bg-black  grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[selectedLang].gptSearchPlaceholder}
        />
        <button
          className=" col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg "
          onClick={handleGPTSSearchClick}
        >
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;

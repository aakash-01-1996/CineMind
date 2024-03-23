import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  // Check if langKey exists in lang object, otherwise fallback to a default language
  const selectedLang = lang[langKey] ? langKey : 'en';

  return (
    <div className="pt-[10%] flex justify-center">
      <form className=" w-1/2  bg-black  grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[selectedLang].gptSearchPlaceholder}
        />
        <button className=" col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;

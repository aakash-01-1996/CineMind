import React from "react";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";
import { BKGRND_IMG } from "../utils/constants";

const GPTSearch = () => {
  return (
    <>
     <div className="fixed -z-10">
        <img className="w-full h-screen object-cover" alt="backgroundImg" src={BKGRND_IMG} />
      </div>
      <div className="">
     

     <GPTSearchBar />
     <GPTMovieSuggestions />
   </div>
    </>
    
  );
};

export default GPTSearch;

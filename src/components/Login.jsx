import React, {useState} from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);  
  }
  return <div>
    <Header />
      
      <div className="absolute"> 
        <img alt="logo" 
        src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/fa6f97d9-245e-43d7-bb56-af27cbf6d656/US-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
        />
      </div>

      <form className="w-3/12 h-auto p-12 bg-black absolute my-36 mx-auto right-0 left-0 rounded-lg text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-6"> {isSignInForm? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input 
        type="text" 
        placeholder=" First name" 
        className="p-3 my-3 text-white w-full bg-gray-700 rounded-md"
        />}

        {!isSignInForm && <input 
        type="text" 
        placeholder=" Last name" 
        className="p-3 my-3 text-white w-full bg-gray-700 rounded-md"
        />}

        <input 
          type="text" 
          placeholder=" Email or phone number" 
          className=" flex p-3 my-3 text-white w-full bg-gray-700 rounded-md"
          />
         
        <input 
        type="password" 
        placeholder=" Password" 
        className="p-3 my-3 text-white w-full bg-gray-700 rounded-md"
        />
       {!isSignInForm && <input 
        type="password" 
        placeholder="Confirm Password" 
        className="p-3 my-3 text-white w-full bg-gray-700 rounded-md"
        />}
        <button className="p-3 my-6 rounded-md bg-red-700 text-white w-full">
        {isSignInForm? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer " 
          onClick={toggleSignInForm}>
            {isSignInForm? "  New to Netflix? Sign up now." : "Already a member? Sign In"}
          
            </p>
      </form> 
  </div>;
};

export default Login;




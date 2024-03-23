import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANG } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLang } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component umounts
    return () => unsubscribe();
  }, []);

  const handleGPTSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGPTSearchView());
  };

  const handlelangChange = (e) => {
    // Change language
    dispatch(changeLang(e.target.value));
  };

  return (
    <div className="absolute w-screen px-5 py-2 bg-gradient-to-b from-black z-50 flex flex-col md:flex-row justify-between">
      <img className="mt-2 w-44 mx-auto md:mx-0" alt="netflixLogo" src={LOGO} />

      {user && (
        <div className="flex p-1">
          {showGPTSearch && (
            <select
              className="opacity-75 rounded-lg bg-slate-500 text-white hover:text-black"
              onChange={handlelangChange}
            >
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className=" opacity-75 py-2 px-2 mx-4  bg-slate-500 text-white
          rounded-lg hover:text-black"
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch ? " Home Page" : "GPT Search"}
          </button>
          <img
            className="hover:cursor-pointer  rounded-md hidden md:block w-12 h-12  justify-center"
            alt="img"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          />
          <button
            onClick={handleSignOut}
            className="  ml-4 px-2 py-2 font-serif bg-red-500 text-black rounded-lg underline hover:text-white"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

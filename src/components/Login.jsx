import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { PHOTO_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BKGRND_IMG } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState();

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const HandleBtnClick = () => {
    // Validate form data..
    // console.log(email.current.value);
    // console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value);
    setErrMessage(message);

    if (message) return;

    // Logic: Sign In/ Sign Up
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: { PHOTO_URL },
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />

      <div className="absolute ">
        <img
          className="w-full h-screen object-cover"
          alt="backgroundImg"
          src={BKGRND_IMG}
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/4 md:w-3/12 h-auto p-12 bg-black absolute my-36 mx-auto right-0 left-0 rounded-lg text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-6">
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder=" First name"
            className="p-3 my-3 text-white w-full bg-gray-700 rounded-md"
          />
        )}

        {!isSignInForm && (
          <input
            type="text"
            placeholder=" Last name"
            className="p-3 my-3 text-white w-full bg-gray-700 rounded-md"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder=" Email or phone number"
          className=" flex p-3 my-3 text-white w-full bg-gray-700 rounded-md"
        />

        <input
          ref={password}
          type="password"
          placeholder=" Password"
          className="p-3 my-3 text-white w-full bg-gray-700 rounded-md"
        />
        {!isSignInForm && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 my-3 text-white w-full bg-gray-700 rounded-md"
          />
        )}

        <p className="text-red-500 px-2 text-sm">{errMessage}</p>

        <button
          className="p-3 my-6 rounded-md bg-red-700 text-white w-full"
          onClick={HandleBtnClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer " onClick={toggleSignInForm}>
          {isSignInForm
            ? "  New to Netflix? Sign up now."
            : "Already a member? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;

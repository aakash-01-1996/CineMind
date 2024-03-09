import React, {useEffect} from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from "../utils/userSlice";

const Body = () => {
    const dispatach = useDispatch();
    


    const  appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Login />
        },
        {
            path : "/browse",
            element : <Browse />
        }
    ]);

    useEffect( () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName} = user;
          dispatach(addUser({uid: uid, email: email, displayName: displayName}));
          
        } else {
          // User is signed out
          dispatach(removeUser());
          
        }
      });

    }, [])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body

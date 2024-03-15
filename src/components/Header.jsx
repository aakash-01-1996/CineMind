import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user); 
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      navigate("/error");  
    });
  };

   useEffect( () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName, photoURL} = user;
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
}, [])

  return (
    <div className="absolute w-screen px-5 py-2 bg-gradient-to-t from-black z-10 flex flex-col md:flex-row justify-between">
     <img 
     className=" w-44 mx-auto md:mx-0"
     alt="netflixLogo" src={LOGO} />  
    
     {user && (
     <div className="flex p-1">
      <img 
        className=" hidden md:block w-12 h-12" 
        alt="img"
        src={user?.photoURL}
      />
      <button onClick={handleSignOut} className="font-semibold text-white">
      [Sign out]
    </button>
    </div>)}
    </div>
    



  )
}

export default Header





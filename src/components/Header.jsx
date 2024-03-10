import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  
  const user = useSelector(store => store.user); 
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {

      navigate("/")
    }).catch((error) => {
      navigate("/error");
      
    });
  };

  return (
    <div className="absolute w-full px-5 py-2 m-5 bg-gradient-to-t from-black shadow-lg z-20 flex justify-between">
     <img 
     className=" w-44"
     alt="netflixLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158" />  
    
     {user && (<div className="flex p-1">
      <img className="w-12 h-12" 
        alt="userIcon" src={user?.photoURL} />
      <button onClick={handleSignOut} className="font-semibold text-white">
      (Sign out)
    </button>
    </div>)}
    </div>
    



  )
}

export default Header





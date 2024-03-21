import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';


const Browse = () => {
  useNowPlayingMovies();


  return (
    <div>
      <Header/>
      {/* 
        MainContainer 
          - video Background 
          - Video Title
          Secondary Container
          - Movie List
          - Movie Cards
      */}
    <MainContainer/>
    <SecondaryContainer/>


    </div>
  )
}

export default Browse

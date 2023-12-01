import React,{ useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App () {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');

        const getMovieRequest = async(searchValue) => {
            const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8d796495`;
            // 일반 문자열이 아닌 템플릿 문자열이 되는것 

            const response = await fetch(url);
            const responseJson = await response.json();

            if(responseJson.Search) {
                setMovies(responseJson.Search);
            }
        };
        useEffect(() => {
            getMovieRequest(searchValue);
        }, [searchValue]);

        useEffect(()=>{
            const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites')
            );
            setFavourites(movieFavourites);
        },[]);

        const saveToLocalStorage = (items) => {
            localStorage.setItem('react-movie-app=favourites',JSON.stringify(items))
            
        };

        const addFavouriteMovie = (movie) =>{
            const newFavouriteList = [...favourites, movie];
            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
        }

        const removeFavouriteMovie = (movie) => {
            const newFravouriteList = favourites.filter((favourite)=> favourite.imdbID !== movie.imdbID
            );

            setFavourites(newFravouriteList);
            saveToLocalStorage(newFravouriteList);
        }
    return(
        <div className="container-fluid movie-app">
            <div className="row d-flex align-items-center mt-4 mb-4">
             <MovieListHeading heading="Movies"/>
             <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
             <div className='row'>
            <MovieList movies={movies} 
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourites}/>
            
            </div>
            
            </div>
            <div className="row d-flex align-items-center mt-4 mb-4">
             <MovieListHeading heading="Favourites"/>
             
            </div>
            <div className='row'>
            <MovieList 
            movies={favourites} 
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={RemoveFavourites}
            />
            </div>
        </div>
    )
}
export default App;

import React,{ useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";

function App () {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');

        const getMoviesRequest = async(searchValue) => {
            const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8d796495`;
            // 일반 문자열이 아닌 템플릿 문자열이 되는것 

            const response = await fetch(url);
            const responseJson = await response.json();

            if(responseJson.Search) {
                setMovies(responseJson.Search);
            }
        };
        useEffect(() => {
            getMoviesRequest(searchValue);
        }, [searchValue]);

        const AddFavouriteMovie = (movie) =>{
            const newFavouriteList = [...favourites, movie];
            setFavourites(newFavouriteList);
        }
    return(
        <div className="container-fluid movie-app">
            <div className='row d-flex align-items-center mt-4 mb-4'>
             <MovieListHeading heading="movies"/>
             <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className='row'>
            <MovieList movies={movies} 
            handleFavouritesClick={AddFavouriteMovie}
            favouriteComponent={AddFavourites}/>
            </div>
            <div className='row d-flex align-items-center mt-4 mb-4'>
             <MovieListHeading heading="Favourites"/>
             
            </div>
            <div className='row'>
            <MovieList 
            movies={favourites} 
            handleFavouritesClick={AddFavouriteMovie}
            favouriteComponent={AddFavourites}
            />
            </div>
        </div>
    )
}
export default App;

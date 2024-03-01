import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import MovieList from "./MovieList";
import Home from "./home";


function List() {
  var [movies, setMovies] = useState([]);
  
  function fetchMovies() {
    axios
      .get('http://localhost:5000/ticket/movies')
      .then((response) => {
        setMovies(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }

  useEffect(() => {
    fetchMovies();
  }, []);
  
  return (
    <div>
      <Navbar></Navbar>
      <div>
      <Home/>
      <br></br>
      <div className="container-fluid">
        <h1>Popular Movies</h1><br></br>
          <div className="movie-list-container">
     {movies.map((movie) => (
          
    <MovieList key={movie._id} movie={movie}/>
          
        ))}
      </div>
      </div>
     </div>
      </div>
  );
}

export default List;
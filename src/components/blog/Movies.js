import React from 'react';
import Navbar from '../Navbar';
import { useState,useEffect } from 'react';
import axios from 'axios';
import MovieList from './MovieList';

function Movies(){
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
  
return(
    <div><Navbar/>
    <h1 style={{textAlign:'center', color:'blue'}}>ALL MOVIES</h1>
    <div className='hori'>
    {movies.map((movie) => (
          
    <MovieList key={movie.id} movie={movie}/>   
                
    ))}
    </div>
    </div>
    
)
}

export default Movies;
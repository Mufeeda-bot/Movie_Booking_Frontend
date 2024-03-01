import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function View() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseDate: '',
    actors: [],
    language: '',
    Directors: '',
    bookings: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/ticket/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
      });
  }, [movieId]);

  return (
    <div>
      <Navbar />
      <div className='container mt-4'>
        <h1 className='text-center'>{movie.title}</h1>

        <div className='row'>
          <div className='col-md-4'>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className='img-fluid rounded shadow'
              style={{ maxHeight: '500px', width: '300px', borderRadius:'20px'}}
            />
          </div>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-body'>
                <h3 className='card-title'>Description</h3>
                <p className='card-text'>{movie.description}</p>
                <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
                <p><strong>Language:</strong> {movie.language}</p>
                {movie.actors.length > 0 && (
                  <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
                )}
                <p><strong>Directed By:</strong> {movie.Directors}</p>
                <Link to={`/bookticket/${movie._id}`} className='btn btn-primary'>
                  Book Ticket
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;

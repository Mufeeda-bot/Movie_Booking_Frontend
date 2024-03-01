import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminPanel() {
  const { movieId } = useParams();
  const admin = useSelector((state) => state.auth.admin);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ticket/movies', {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:5000/admins/movies/${movieId}`, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const toggleMovieStatus = async (movieId, currentStatus) => {
    try {
      const endpoint = currentStatus === 'disabled' ? 'enable' : 'disable';
      await axios.put(`http://localhost:5000/admins/movies/${movieId}/${endpoint}`, null, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      fetchMovies();
    } catch (error) {
      console.error(`Error ${currentStatus === 'disabled' ? 'enabling' : 'disabling'} movie:`, error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          {movies.map((movie) => (
            <div key={movie._id} className='col-md-2 mb-2'>
              <div className='card'>
                <img src={movie.posterUrl} alt={movie.title} className='card-img-top' style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
                <div className='card-body'>
                  <h5 className='card-title'>{movie.title}</h5>
                </div>
                <div className='card-footer d-flex justify-content-between'>
                  <button className='btn btn-danger' onClick={() => deleteMovie(movie._id)}>Delete</button>
                  <Link to={`/edit/${movie._id}`}><button className='btn btn-primary'>Edit</button></Link>
                  {/* Conditionally render the button based on the movie's status */}
                  {movie.status === 'disabled' ? (
                    <button className='btn btn-secondary' onClick={() => toggleMovieStatus(movie._id, 'disabled')}>Enable</button>
                  ) : (
                    <button className='btn btn-success' onClick={() => toggleMovieStatus(movie._id, 'active')}>Disable</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

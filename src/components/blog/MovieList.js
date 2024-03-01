import React from 'react';
import { Link } from 'react-router-dom';

function MovieList(props) {
  const { movie } = props;
  const cardStyle = {
    // Apply additional styling for disabled movies
    filter: movie.status === 'disabled' ? 'blur(5px)' : 'none', // Blur effect for disabled movies
    pointerEvents: movie.status === 'disabled' ? 'none' : 'auto', // Disable pointer events for disabled movies
    backgroundColor: '#000', // Black background color
    color: '#fff', // White text color
    borderRadius: '10px', // Rounded corners
    overflow: 'hidden', // Hide overflow content
    transition: 'transform 0.3s ease', // Smooth transition
    cursor: 'pointer', // Change cursor on hover
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover', // Cover image within the container
  };

  const titleStyle = {
    margin: '0', // Remove default margin
    padding: '10px', // Add padding to the title
    fontSize: '18px', // Larger font size
    textAlign: 'center', // Center align the title
  };

  return (
    <div className='col-md-2 mb-4'>
      <div className='card h-100' style={cardStyle}>
        <Link to={`/ticket/movies/${movie._id}`} className='card-link'>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className='card-img-top img-fluid'
            style={imageStyle}
          />
        </Link>
        <div className='card-body'>
          <h5 className='card-title' style={titleStyle}>{movie.title}</h5>
        </div>
      </div>
    </div>
  );
}

export default MovieList;

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import checkAuth from '../auth/checkAuth';

function Confirmation() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/bookings/book/${bookingId}`)
      .then((response) => {
        setBooking(response.data);
      })
      .catch((error) => {
        console.error('Error fetching booking:', error);
      });
  }, [bookingId]);

  return (
    <div>
      <Navbar />
      <div className='container mt-4'>
        <h1 className='text-center mb-4'>Booking Confirmation</h1>
        {booking ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Booking ID: {booking._id}</h5>
              <p className="card-text">Movie: {booking.movie.title}</p>
              <p className="card-text">Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p className="card-text">Time: {booking.timing}</p>
              <p className="card-text">Seats: {booking.seats}</p>
              <Link to="/my-bookings" className='btn btn-info'>Confirm</Link>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default checkAuth(Confirmation);

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useParams, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import checkAuth from '../auth/checkAuth';


function Book() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');

  const navigate = useNavigate(); 

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

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedSeat) {
      alert('Please select both date, time, and seats.');
      return;
    }

    axios
      .post(`http://localhost:5000/bookings/book/${movieId}`, {
        date: selectedDate,
        timing: selectedTime,
        seats: [selectedSeat]
      })
      .then((response) => {
        console.log('Booking successful:', response.data);
        navigate(`/confirmation/${response.data._id}`); 
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
        if (error.response && error.response.status === 400) {
          alert(error.response.data.error);
        } else {
          alert('Failed to create booking. Please try again later.');
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="text-center">Book Ticket</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card ">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={movie.posterUrl} alt={movie.title} className="card-img" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <div className="form-group">
                      <label htmlFor="date">Select Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="time">Select Time:</label>
                      <select
                        className="form-control"
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      >
                        <option value="">-- Select Time --</option>
                        {/* Replace with actual options based on movie schedule */}
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="2:30 PM">2:30 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="seats">Select Seats:</label>
                      <select
                        className="form-control"
                        id="seat"
                        value={selectedSeat}
                        onChange={(e) => setSelectedSeat(e.target.value)}
                      >
                        <option value="">-- Select Seats --</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="A3">A3</option>
                        <option value="A4">A4</option>
                        <option value="A5">A5</option>
                        <option value="A6">A6</option>
                        <option value="A7">A7</option>
                        <option value="A8">A8</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="B3">B3</option>
                      </select>
                    </div>
                    <button onClick={handleBooking} className="btn btn-primary">
                      Book Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(Book);

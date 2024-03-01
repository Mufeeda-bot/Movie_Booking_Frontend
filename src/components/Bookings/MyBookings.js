import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode'; 
import checkAuth from '../auth/checkAuth';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 20,
    padding: 10,
    flexGrow: 1,
    border:'1px solid black'
  },
  movieHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign:'center',
    marginBottom:20
  },
  qrCodeContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    textAlign: 'right',
  },
});

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/bookings/book') 
      .then((response) => {
        const fetchMovieDetails = async () => {
          const updatedBookings = await Promise.all(response.data.map(async (booking) => {
            try {
              const movieResponse = await axios.get(`http://localhost:5000/ticket/movies/${booking.movie}`);
              const movieName = movieResponse.data.title;
              const qrCodeData = `Booking ID: ${booking._id}\nMovie: ${movieName}\nDate: ${new Date(booking.date).toLocaleDateString()}\nTime: ${booking.timing}\nSeats: ${booking.seats}`;
              const qrCodeURL = await QRCode.toDataURL(qrCodeData);
              return { ...booking, movie: movieName, qrCodeURL };
            } catch (error) {
              console.error('Error fetching movie:', error);
              return booking;
            }
          }));
          setBookings(updatedBookings);
        };
        fetchMovieDetails();
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const TicketDocument = ({ booking }) => (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.movieHeading}>{booking.movie}</Text> 
          <Text>Booking ID: {booking._id}</Text>
          <Text>Date: {new Date(booking.date).toLocaleDateString()}</Text>
          <Text>Time: {booking.timing}</Text>
          <Text>Seats: {booking.seats}</Text>
          <View style={styles.qrCodeContainer}>
            <Image src={booking.qrCodeURL} style={{ width: '100px', height: '100px' }}/> 
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <Navbar />
      <div className='container mt-4'>
        <h1 className='text-center'>My Bookings</h1>
        <div className="row">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Booking ID: {booking._id}</h5>
                    <p className="card-text">Movie: {booking.movie}</p>
                    <p className="card-text">Date: {new Date(booking.date).toLocaleDateString()}</p>
                    <p className="card-text">Time: {booking.timing}</p>
                    <p className="card-text">Seats: {booking.seats.join(', ')}</p>

                    <PDFDownloadLink document={<TicketDocument booking={booking} />} fileName={`ticket_${booking._id}.pdf`}>
                      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Ticket')}
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default checkAuth(MyBookings);

import { createBrowserRouter } from "react-router-dom";
import List from "./components/blog/List";
import View from "./components/blog/View";
import Movies from "./components/blog/Movies"
import User from "./components/auth/User"
import Register from "./components/auth/Register";
import Admin from "./components/auth/Admin";
import Book from "./components/Bookings/Book";
import AdminSignup from "./components/auth/AdminSignup";
import AdminPanal from "./components/auth/AdminPanal";
import AddMovies from "./components/auth/AddMovies";
import Edit from "./components/auth/Edit";
import Confirmation from "./components/Bookings/Confirmation";
import MyBookings from "./components/Bookings/MyBookings";
//import SeatLayout from "./components/Bookings/SeatLayout";

const router = createBrowserRouter([
    { path: '/', element: <List/> },
    { path: '/ticket/movies/:movieId', element: <View/> },
    { path: '/movies', element: <Movies/> },
    { path: '/login', element: <User/> },
    { path: '/signup', element: <Register/> },
    { path: '/admin', element: <Admin/> },
    { path: '/adminSignup', element: <AdminSignup/> },
   { path: '/bookticket/:movieId', element: <Book/> },
   { path: '/confirmation/:bookingId', element: <Confirmation/> },
   { path: '/panal', element: <AdminPanal/> },
   { path: '/add', element: <AddMovies/> },
   { path: '/edit/:movieId', element: <Edit/> },
   { path: '/my-bookings', element: <MyBookings/> },
   //{ path: '/seats/:bookingId', element: <SeatLayout/> },



]);

export default router;
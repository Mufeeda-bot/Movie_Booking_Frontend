import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import checkGuest from "./checkguest";

function User() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function attemptLogin() {
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email: email,
        password: password
      });

      setErrorMessage('');
      const user = {
        email: email,
        token: response.data.token
      };
      dispatch(setUser(user));
      navigate("/");
    } catch (error) {
      if (error.response.data.errors) {
        setErrorMessage(Object.values(error.response.data.errors).join(''));
      } else if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to login user. Please contact admin');
      }
    }
  }

  const backgroundStyle = {
    backgroundImage: `url('http://wallpapercave.com/wp/wp1945909.jpg')`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    color: 'white' // Text color set to white
  };

  return (
    <div >
      <Navbar />
      <div style={backgroundStyle}>
        <div style={{height:'500px', width:'400px'}}>
          <div className="card mx-auto my-4" style={cardStyle}>
            <div className="card-body">
              <h1 className="card-title text-center mb-4" >Login</h1>
              {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary float-right" type="button" onClick={attemptLogin}>
                  Login
                </button>
              </div>
              <Link to={'/signup'} style={{ color: 'white' }}>Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkGuest(User);

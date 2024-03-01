import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../store/authSlice";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function Admin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function attemptLogin() {
        try {
            const response = await axios.post(
                'http://localhost:5000/admins/login',
                {
                    email: email,
                    password: password,
                },
            );

            setErrorMessage('');

            const newAdmin = {
                email: email,
                token: response.data.token
            };

            dispatch(setAdmin(newAdmin));
            navigate("/panal");
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
        backgroundImage: `url('https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center'
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0)', // Fully transparent white color
        backdropFilter: 'blur(10px)', // Blur effect
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '400px',
        width: '100%',
        color: 'white' // Text color
    };

    return (
        <div>
            <Navbar />
            <div style={backgroundStyle}>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="card mx-auto my-4" style={cardStyle}>
                    <div className="card-body">
                        <h1 className="card-title text-center mb-4">Login</h1>
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
                            <button className="btn btn-primary float-right" onClick={attemptLogin}>Login</button>
                        </div>
                        {/* <Link to={'/adminSignup'}>Create Account</Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;

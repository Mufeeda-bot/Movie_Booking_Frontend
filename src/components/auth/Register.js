import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const registerUser = () => {
        const user = {
            name: name,
            email: email,
            password: password
        };
        axios.post('http://localhost:5000/users/signup', user)
        .then(response => {
            setErrorMessage('');
            navigate('/login');
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to register user. Please try again later.');
            }
        });
    };

    const backgroundStyle = {
        backgroundImage: `url('http://wallpapercave.com/wp/wp1945909.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center'
    };

    return (
        <div style={backgroundStyle}>
            <div className="card" style={{ width: '400px', background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)', borderRadius: '10px', padding: '20px' }}>
                <h1 className="text-center mb-4">Register</h1>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            value={name} 
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={email} 
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            value={password} 
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={registerUser}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;

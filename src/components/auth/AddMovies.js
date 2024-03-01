import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function AddMovies() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('');
    const [releaseDate, setRelease] = useState('');
    const [Directors, setDirectors] = useState('');
    const [actors, setActors] = useState('');
    const [posterUrl, setposter] = useState('');
    
    const navigate = useNavigate();

    function addMovie() {
        axios.post(
            'http://localhost:5000/admins/movies',
            {
                title: title,
                description: description, 
                language: language,
                releaseDate: releaseDate,
                Directors: Directors,
                actors: actors,
                posterUrl: posterUrl
            },
        )
        .then(response => {
            navigate('/panal');
        })
        .catch(error => {
            console.error('Error adding movie:', error);
            console.error('Unexpected error:', error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid" style={{ backgroundImage: `url('https://wallpapercave.com/wp/a8uKHlq.jpg')`, backgroundSize: 'cover', minHeight: '100vh' }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow rounded-lg" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
                            <div className="card-body">
                                <h1 className="card-title text-center mb-4">Add Movies</h1>
                                <div className="form-group">
                                    <label>Title:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={title} 
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea 
                                        className="form-control" 
                                        value={description} 
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Language:</label>
                                    <input 
                                        className="form-control" 
                                        value={language} 
                                        onChange={(event) => setLanguage(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Release Date:</label>
                                    <input 
                                        type="date"
                                        className="form-control" 
                                        value={releaseDate} 
                                        onChange={(event) => setRelease(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Director:</label>
                                    <input 
                                        type="text"
                                        className="form-control" 
                                        value={Directors} 
                                        onChange={(event) => setDirectors(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Actors:</label>
                                    <input
                                        type="text"
                                        className="form-control" 
                                        value={actors} 
                                        onChange={(event) => setActors(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Poster URL:</label>
                                    <input
                                        className="form-control" 
                                        value={posterUrl} 
                                        onChange={(event) => setposter(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" onClick={addMovie}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMovies;

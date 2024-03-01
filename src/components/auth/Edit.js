import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Edit() {
    const { movieId } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('');
    const [releaseDate, setRelease] = useState('');
    const [Directors, setDirectors] = useState('');
    const [actors, setActors] = useState('');
    const [posterUrl, setPoster] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/admins/movies/${movieId}`)
            .then(response => {
                const { title, description, language, releaseDate, Directors, actors, posterUrl } = response.data;
                setTitle(title);
                setDescription(description);
                setLanguage(language);
                setRelease(releaseDate);
                setDirectors(Directors);
                setActors(actors);
                setPoster(posterUrl);
            })
            .catch(error => {
                console.error('Error fetching movie:', error);
            });
    }, [movieId]);

    function updateMovie() {
        axios.put(`http://localhost:5000/admins/movies/${movieId}`, {
            title: title,
            description: description,
            language: language,
            releaseDate: releaseDate,
            Directors: Directors,
            actors: actors,
            posterUrl: posterUrl
        })
            .then(response => {
                alert(response.data.message);
                navigate('/panal');
            })
            .catch(error => {
                console.error('Error updating movie:', error);
            });
    }

    return (
        <div style={{
            backgroundImage: `url('https://wallpapercave.com/wp/a8uKHlq.jpg')`,
            backgroundSize: 'cover',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-body">
                                <h1 className="card-title text-center mb-4">Edit Movie</h1>
                                <form>
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
                                            className="form-control"
                                            value={Directors}
                                            onChange={(event) => setDirectors(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Actors:</label>
                                        <input
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
                                            onChange={(event) => setPoster(event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-block"
                                            onClick={updateMovie}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;

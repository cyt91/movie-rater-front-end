import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, removeToken] = useCookies(['mr-token']);

  const editClickedHandler = (movie) => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  };

  const loadMovie = (movie) => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  };

  const updatedMovie = (mov) => {
    const newMovies = movies.map((movie) => {
      if (movie.id === mov.id) {
        return mov;
      }
      return movie;
    });
    setMovies(newMovies);
  };

  useEffect(() => {
    if (!token['mr-token']) window.location.href = '/';
  }, [token]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
    })
      .then((response) => response.json())
      .then((resp) => setMovies(resp))
      .catch((error) => console.error(error));
  }, []);

  const createNewMovie = () => {
    setEditedMovie({ title: '', description: '' });
    setSelectedMovie(null);
  };

  const movieCreated = (movie) => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  };

  const removeClickedHandler = (removedMovieId) => {
    const newMovies = movies.filter((movie) => movie.id !== removedMovieId);
    setMovies(newMovies);
  };

  const logOutUser = () => {
    removeToken(['mr-token']);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />
          <span>Movie Rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logOutUser} />
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieClickedHandler={loadMovie}
            editClickedHandler={editClickedHandler}
            removeClickedHandler={removeClickedHandler}
          />
          <button type="button" onClick={createNewMovie}>
            New Movie
          </button>
        </div>

        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        {editedMovie ? (
          <MovieForm
            movie={editedMovie}
            updatedMovie={updatedMovie}
            movieCreated={movieCreated}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;

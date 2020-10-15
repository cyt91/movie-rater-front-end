import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

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
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token 42444ee862e5e065edcd497840a445ae8ad4ca2d',
      },
    })
      .then((response) => response.json())
      .then((resp) => setMovies(resp))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className="layout">
        <MovieList
          movies={movies}
          movieClickedHandler={loadMovie}
          editClickedHandler={editClickedHandler}
        />
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        {editedMovie ? (
          <MovieForm
            movie={editedMovie}
            updatedMovie={updatedMovie}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;

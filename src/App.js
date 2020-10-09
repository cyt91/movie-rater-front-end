import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');

  const movieClickedHandler = (movie) => {
    setSelectedMovie(movie);
  };

  const loadMovie = (movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 42444ee862e5e065edcd497840a445ae8ad4ca2d',
      },
    })
      .then((response) => response.json())
      .then((resp) => setMovies(resp))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className="layout">
        <MovieList movies={movies} movieClickedHandler={movieClickedHandler} />
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
      </div>
    </div>
  );
}

export default App;

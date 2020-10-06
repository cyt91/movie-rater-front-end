import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';

function App() {
  const [movies, setMovies] = useState([]);

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
        <MovieList movies={movies} />
        <div>Movie details</div>
      </div>
    </div>
  );
}

export default App;

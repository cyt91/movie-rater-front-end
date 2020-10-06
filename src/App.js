import React, { useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState(['Movie 1', 'Movie 2']);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className="layout">
        <div>
          {movies.map((movie) => (
            <h2>{movie}</h2>
          ))}
        </div>
        <div>Movie details</div>
      </div>
    </div>
  );
}

export default App;

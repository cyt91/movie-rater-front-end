import React from 'react';

export default function MovieList(props) {
  const { movies, movieClicked: movieClickedFunc } = props;
  const movieClicked = (movie) => (evt) => {
    movieClickedFunc(movie);
    console.log(evt);
  };
  return (
    <div>
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
        </div>
      ))}
    </div>
  );
}

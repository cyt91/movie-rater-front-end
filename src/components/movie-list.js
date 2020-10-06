import React from 'react';

export default function MovieList(props) {
  const { movies } = props;
  return (
    <div>
      {movies?.map((movie) => (
        <h2 key={movie.id}>{movie.title}</h2>
      ))}
    </div>
  );
}

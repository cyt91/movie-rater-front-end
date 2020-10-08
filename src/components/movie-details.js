import React from 'react';

export default function MovieDetails(props) {
  const { movie } = props;
  return (
    <div>
      <h1>{movie?.title}</h1>
      <p>{movie?.description}</p>
    </div>
  );
}

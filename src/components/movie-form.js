import React from 'react';

export default function MovieForm(props) {
  const { movie } = props;
  return <>{movie ? <h1>{movie.title} edit</h1> : null}</>;
}

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function MovieList(props) {
  const { movies, movieClickedHandler: movieClickedFunc, editClickedHandler: editClickedFunc } = props;
  const movieClicked = (movie) => (evt) => {
    movieClickedFunc(movie);
    console.log(evt);
  };

  const editClicked = (movie) => {
    editClickedFunc(movie);
  };

  return (
    <div>
      {movies?.map((movie) => (
        <div key={movie.id} className="movie-item">
          <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
          <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
          <FontAwesomeIcon icon={faTrash} />
        </div>
      ))}
    </div>
  );
}

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import API from '../api-service';

export default function MovieList(props) {
  const {
    movies,
    movieClickedHandler: movieClickedFunc,
    editClickedHandler: editClickedFunc,
    removeClickedHandler: removeClickedFunc,
  } = props;
  const [token] = useCookies(['mr-token']);
  const movieClicked = (movie) => (evt) => {
    movieClickedFunc(movie);
  };

  const editClicked = (movie) => {
    editClickedFunc(movie);
  };

  const removeClicked = (movieId) => {
    API.removeMovie(movieId, token)
      .then(() => removeClickedFunc(movieId))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {movies?.map((movie) => (
        <div key={movie.id} className="movie-item">
          <h2 className="movie-title" onClick={movieClicked(movie)}>
            {movie.title}
          </h2>
          <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => removeClicked(movie.id)}
          />
        </div>
      ))}
    </div>
  );
}

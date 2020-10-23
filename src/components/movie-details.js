import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';

export default function MovieDetails(props) {
  const { movie } = props;
  const [highlightedStars, setHighlightedStars] = useState(0);
  const numStarsFilled = Math.trunc(movie?.avg_rating || 0);
  const numStarsUnfilled = 5 - numStarsFilled;
  const [token] = useCookies(['mr-token']);

  const FilledStars = () => {
    return [...Array(numStarsFilled)].map((e, i) => (
      <FontAwesomeIcon
        icon={faStar}
        className="orange"
        key={`${movie.id + i}`}
      />
    ));
  };
  const UnfilledStars = () => {
    return [...Array(numStarsUnfilled)].map((e, i) => (
      <FontAwesomeIcon icon={faStar} key={`${movie.id + (4 - i)}`} />
    ));
  };

  const getDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
    })
      .then((response) => response.json())
      .then((response) => props.updateMovie(response))
      .catch((error) => console.error(error));
  };

  const rateMovieHandler = (rating) => (evt) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/rate_movie/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token['mr-token']}`,
        },
        body: JSON.stringify({
          stars: rating,
        }),
      },
    )
      .then(() => getDetails())
      .catch((error) => console.error(error));
  };

  const RateMovie = () => {
    return (
      <div className="rate-container">
        <h2>Rate it</h2>
        {[...Array(5)].map((e, i) => {
          return (
            <FontAwesomeIcon
              icon={faStar}
              className={highlightedStars > i ? 'purple' : ''}
              key={`${movie.id + i}userRateMovie`}
              onMouseEnter={() => setHighlightedStars(i + 1)}
              onMouseLeave={() => setHighlightedStars(0)}
              onClick={rateMovieHandler(i + 1)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <FilledStars />
          <UnfilledStars />({movie.no_of_ratings})
          <RateMovie />
        </div>
      ) : null}
    </>
  );
}

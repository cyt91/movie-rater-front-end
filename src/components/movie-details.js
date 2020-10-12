import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function MovieDetails(props) {
  const { movie } = props;
  const [highlightedStars, setHighlightedStars] = useState(0);
  const numStarsFilled = Math.trunc(movie?.avg_rating || 0);
  const numStarsUnfilled = 5 - numStarsFilled;

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
    fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token 42444ee862e5e065edcd497840a445ae8ad4ca2d',
      },
    })
      .then((response) => response.json())
      .then((response) => props.updateMovie(response))
      .catch((error) => console.log(error));
  };

  const rateMovieHandler = (rating) => (evt) => {
    fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token 42444ee862e5e065edcd497840a445ae8ad4ca2d',
      },
      body: JSON.stringify({
        stars: rating,
      }),
    })
      .then(() => getDetails())
      .catch((error) => console.log(error));
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

const TOKEN = '42444ee862e5e065edcd497840a445ae8ad4ca2d';

export default class API {
  static updateMovie(movieId, body) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movieId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${TOKEN}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static createMovie(body) {
    return fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${TOKEN}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}

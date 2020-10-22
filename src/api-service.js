export default class API {
  static updateMovie(movieId, body, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movieId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static createMovie(body, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static removeMovie(movieId, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movieId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
    });
  }

  static loginUser(body) {
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static registerUser(body) {
    return fetch(`http://127.0.0.1:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static getMovies(token) {
    return fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
    }).then((response) => response.json());
  }
}

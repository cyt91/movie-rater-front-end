export default class API {
  static updateMovie(movieId, body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movieId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static createMovie(body, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static removeMovie(movieId, token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movieId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
    });
  }

  static loginUser(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static registerUser(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static getMovies(token) {
    return fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
    }).then((response) => response.json());
  }
}

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import API from '../api-service';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['mr-token']);
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    if (token['mr-token']) window.location.href = '/movies';
  }, [token]);

  const loginClicked = () => {
    API.loginUser({ username, password })
      .then((response) => setToken('mr-token', response.token))
      .catch((error) => console.error(error));
  };

  const registerClicked = () => {
    API.registerUser({ username, password })
      .then(() => loginClicked())
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
      <label htmlFor="username">Username</label>
      <br />
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      {isLoginView ? (
        <button type="submit" onClick={loginClicked}>
          Login
        </button>
      ) : (
        <button type="submit" onClick={registerClicked}>
          Register
        </button>
      )}
      {isLoginView ? (
        <p>
          You don&apos;t have an account? Register{' '}
          <Link
            href="javascript:void(0)"
            to=""
            onClick={() => setIsLoginView(false)}
          >
            here
          </Link>
        </p>
      ) : (
        <p>
          You already have an account? Login{' '}
          <Link
            href="javascript:void(0)"
            to=""
            onClick={() => setIsLoginView(true)}
          >
            here
          </Link>
        </p>
      )}
    </div>
  );
}

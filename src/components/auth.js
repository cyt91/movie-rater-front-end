import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import API from '../api-service';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useCookies(['mr-token']);

  useEffect(() => {
    if (token['mr-token']) window.location.href = '/movies';
  }, [token]);

  const loginClicked = () => {
    API.loginUser({ username, password })
      .then((response) => setToken('mr-token', response.token))
      .catch((error) => console.error(error));
  };

  return (
    <div>
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
      <button type="submit" onClick={loginClicked}>
        Login
      </button>
    </div>
  );
}

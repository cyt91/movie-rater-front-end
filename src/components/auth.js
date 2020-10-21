import React, { useState } from 'react';
import API from '../api-service';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginClicked = () => {
    API.loginUser({ username, password })
      .then((response) => console.log(response.token))
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

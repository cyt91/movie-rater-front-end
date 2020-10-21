import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Auth from './components/auth';
import * as serviceWorker from './serviceWorker';

export const TokenContext = createContext(null);

function Router() {
  const [token, setToken] = useState('');

  return (
    <React.StrictMode>
      <TokenContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Route exact path="/" component={Auth} />
          <Route exact path="/movies" component={App} />
        </BrowserRouter>
      </TokenContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

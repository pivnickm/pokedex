import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './store';

import App from './app';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const initialState = window.__PRELOADED_STATE__;
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

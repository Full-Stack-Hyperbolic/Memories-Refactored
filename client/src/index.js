import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';

import { Provider } from 'react-redux';
import store from './state/store';
// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import reducers from './state/reducers';

// const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import {reducers} from "./redux/reducers";

export const store = createStore(reducers, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import Firebase from 'src/firebase';
// eslint-disable-next-line import/no-named-as-default
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/assets/css/style.css';

ReactDOM.render(<CookiesProvider><App firebase={new Firebase()} /></CookiesProvider>, document.getElementById('app'));

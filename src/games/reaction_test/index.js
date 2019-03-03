import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/assets/css/style.css';

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('app'));

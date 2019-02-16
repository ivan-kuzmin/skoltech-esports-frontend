import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('root'));

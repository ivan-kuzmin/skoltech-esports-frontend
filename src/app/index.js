import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'src/firebase';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(<App firebase={new Firebase()} />, document.getElementById('root'));

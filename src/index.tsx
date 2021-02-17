import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import root from 'react-shadow/styled-components';

const mountElement = document.createElement('div');
mountElement.id = 'cintsa-cms-app-root';
document.body.appendChild(mountElement);
ReactDOM.render(
  <root.div style={{ height: '100%', width: '100%'}}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </root.div>,
  mountElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

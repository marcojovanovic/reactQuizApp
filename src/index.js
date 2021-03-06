import React from 'react';
import ReactDOM from 'react-dom';
import { QuizzProvider } from './QuizzOriginal/context';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <QuizzProvider>
      <App />
    </QuizzProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

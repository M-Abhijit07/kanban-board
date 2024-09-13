import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { KanbanProvider } from './components/KanbanContext';

ReactDOM.render(
  <React.StrictMode>
    <KanbanProvider>
      <App />
    </KanbanProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

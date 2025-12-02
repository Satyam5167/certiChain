import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import SmoothScrolling from './components/SmoothScrolling.jsx';

createRoot(document.getElementById('root')).render(

  <SmoothScrolling>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SmoothScrolling>

);

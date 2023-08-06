import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from './Auth/context/AuthContext';
import { VideoContextProvider } from './VideoContext/VideoContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthContextProvider>
      <VideoContextProvider>
        <App />
      </VideoContextProvider>
    </AuthContextProvider>
  </Router>
);
reportWebVitals();

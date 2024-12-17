import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import React from 'react';
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthProvider>
        <App />
      </AuthProvider> */}
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);
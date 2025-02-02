import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering React components
// import './index.css'; // You can uncomment this line if you have global styles
import App from './App'; // Import the main App component

// Creating a root reference using React 18's new method for rendering components
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component wrapped with React.StrictMode for better development experience
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

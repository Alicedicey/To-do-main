import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/todoList.css';

const NotFound = () => {
  return (
    <main className="todo-list-container not-found-container" role="alert" aria-live="assertive">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/" className="back-button">Go to Home</Link>
    </main>
  );
};

export default NotFound;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'antd';
import '../styles/todoList.css';

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/${id}';


  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(BASE_URL);
        setTodo(response.data);
      } catch (err) {
        let errorMessage = 'Failed to load todo details.';
        if (axios.isAxiosError(err)) {
            if (err.response) {
                if (err.response.status === 404) {
                    errorMessage = 'Todo not found.';
                } else {
                    errorMessage = `Error: ${err.response.status} - ${err.response.statusText || 'Server Error'}`;
                }
            } else if (err.request) {
              errorMessage = 'Network error. No response received from server.';
            } else {
              errorMessage = err.message;
            }
        } else {
          errorMessage = err.message;
        }
        setError(new Error(errorMessage));
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return (
      <main className="todo-detail-container" role="status" aria-live="polite">
        <div className="todo-detail-wrapper">
          <p className="loading-message">Loading todo details...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="todo-detail-container" role="alert" aria-live="assertive">
        <div className="todo-detail-wrapper">
          <p className="error-message">{error.message}</p>
          <Link to="/" className="back-button">Back to Todo List</Link>
        </div>
      </main>
    );
  }

  if (!todo) {
    return (
      <main className="todo-detail-container">
        <div className="todo-detail-wrapper">
          <p className="error-message">No todo found with ID: {id}</p>
          <Link to="/" className="back-button">Back to Todo List</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="todo-detail-container">
      <div className="todo-detail-wrapper">
        <header className="detail-header">
          <h2>Todo Details</h2>
        </header>
        <section className="detail-info">
          <p><strong>Title:</strong> {todo.title}</p>
          <p><strong>ID:</strong> {todo.id}</p>
          <p><strong>User ID:</strong> {todo.userId}</p>
          <p>
            <strong>Status:</strong> {' '}
            <span className={todo.completed ? 'status-completed' : 'status-pending'}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
          </p>
        </section>
        <Link to="/" className="back-button" aria-label="Back to todo list">
          Back to Todo List
        </Link>
      </div>
    </main>
  );
};

export default TodoDetails;
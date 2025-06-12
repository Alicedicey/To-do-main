import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './pages/TodoList';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import TodoDetails from './pages/TodoDetails';

function App() {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<TodoList toggleTheme={toggleTheme} currentTheme={currentTheme} />} />
          <Route path="/todos/:id" element={<TodoDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer> 
  <p> Built by Odunayo -AltSchool Exam Project</p>
</footer>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
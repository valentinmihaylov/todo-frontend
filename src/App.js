import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch('http://localhost:8080/todo')
      .then(response => response.json())
      .then(data => setTodos(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = (id) => {
    fetch(`http://localhost:8080/todo?id=${id}`, {
      method: 'PUT',
    })
    .then(() => fetchTodos())
    ;
  };

  return (
    <div className="App">
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completedAt ? 'completed' : ''} onClick={() => deleteTodo(todo.id)}>
            {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

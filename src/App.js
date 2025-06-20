import React, { useState, useEffect } from 'react';
import TodoItem from './ToDoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:4000/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text) return;
    const res = await fetch('http://localhost:4000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`http://localhost:4000/api/todos/${id}`, {
      method: 'PUT'
    });
    const updated = await res.json();
    setTodos(todos.map(todo => todo._id === id ? updated : todo));
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:4000/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 40 }}>
      <h2>📝 To-Do List</h2>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a task"
        style={{ width: '70%' }}
      />
      <button onClick={addTodo}>Add</button>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={() => toggleTodo(todo._id)}
          onDelete={() => deleteTodo(todo._id)}
        />
      ))}
    </div>
  );
}

export default App;

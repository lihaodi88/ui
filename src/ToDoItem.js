import React from 'react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '5px 0'
    }}>
      <span
        onClick={onToggle}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
      >
        {todo.text}
      </span>
      <button onClick={onDelete}>❌</button>
    </div>
  );
}

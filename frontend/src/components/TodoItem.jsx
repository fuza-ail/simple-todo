import React from "react"

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo._id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button className="todo-delete" onClick={() => deleteTodo(todo._id)}>
        ×
      </button>
    </li>
  )
}

export default TodoItem

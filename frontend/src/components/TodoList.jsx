import React from "react"
import TodoItem from "./TodoItem"

function TodoList({ todos, toggleTodo, deleteTodo }) {
  if (todos.length === 0) {
    return <p style={{ textAlign: "center" }}>No todos to display</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  )
}

export default TodoList

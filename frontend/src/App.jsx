import axios from "axios"
import React, { useEffect, useState } from "react"
import FilterButtons from "./components/FilterButtons"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

const API_URL = "http://localhost:5000/api/todos"

function App() {
  const [todos, setTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL)
        setTodos(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch todos")
        setLoading(false)
        console.error("Error fetching todos:", err)
      }
    }

    fetchTodos()
  }, [])

  // Filter todos based on selected filter
  useEffect(() => {
    switch (filter) {
      case "active":
        setFilteredTodos(todos.filter((todo) => !todo.completed))
        break
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed))
        break
      default:
        setFilteredTodos(todos)
    }
  }, [todos, filter])

  // Add new todo
  const addTodo = async (text) => {
    if (!text.trim()) return

    try {
      const response = await axios.post(API_URL, { text })
      setTodos([response.data, ...todos])
    } catch (err) {
      setError("Failed to add todo")
      console.error("Error adding todo:", err)
    }
  }

  // Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      const todoToToggle = todos.find((todo) => todo._id === id)
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !todoToToggle.completed,
      })

      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)))
    } catch (err) {
      setError("Failed to update todo")
      console.error("Error updating todo:", err)
    }
  }

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (err) {
      setError("Failed to delete todo")
      console.error("Error deleting todo:", err)
    }
  }

  // Change filter
  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  if (loading) return <div className="container">Loading...</div>
  if (error) return <div className="container">Error: {error}</div>

  return (
    <div className="container">
      <div className="header">
        <h1>Todo App</h1>
        <p>Keep track of your tasks</p>
      </div>
      <TodoForm addTodo={addTodo} />
      <FilterButtons filter={filter} changeFilter={changeFilter} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}

export default App

// server/server.js
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const todoRoutes = require("./routes/todos")

// Initialize express app
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/todos", todoRoutes)

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Todo API is running...")
})

// Define port
const PORT = process.env.PORT || 5000

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

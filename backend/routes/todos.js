const express = require("express")
const router = express.Router()
const Todo = require("../models/Todo")

// @route   GET api/todos
// @desc    Get all todos
// @access  Public
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.json(todos)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   POST api/todos
// @desc    Create a todo
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    })

    const todo = await newTodo.save()
    res.json(todo)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   PUT api/todos/:id
// @desc    Update a todo
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" })
    }

    // Update todo fields
    if (req.body.text !== undefined) todo.text = req.body.text
    if (req.body.completed !== undefined) todo.completed = req.body.completed

    await todo.save()
    res.json(todo)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   DELETE api/todos/:id
// @desc    Delete a todo
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" })
    }

    // For Mongoose 6.0+, use deleteOne() instead of remove()
    await Todo.deleteOne({ _id: req.params.id })
    res.json({ msg: "Todo removed" })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router

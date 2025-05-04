const mongoose = require("mongoose")

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/todo-app"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB

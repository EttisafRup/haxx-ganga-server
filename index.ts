console.clear()
import dotenv from "dotenv"
dotenv.config()
import { env } from "process"

import express from "express"
import signup from "./routes/signup"
import errorHandler from "./middlewares/errorHandler"
import notFound from "./routes/notFound"
import mongoose from "mongoose"
import cors from "cors"
import toolsController from "./controllers/toolsController"

// import login from "./routes/login"

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/tools", toolsController) // => Tools Data
app.use("/signup", signup) // => Signup Route
// app.use("/login", login)// => Login Route
app.use(notFound) // ! Not Found Route
app.use(errorHandler) // ! Error handling

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}/`)
})
// => Database Connection
const DB = process.env.DB ? process.env.DB : ""
mongoose
  .connect(DB)
  .then(() => console.log("Database has been connected successfully"))
  .catch((err) => console.log(err))

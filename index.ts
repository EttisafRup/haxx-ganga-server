console.clear()
import dotenv from "dotenv"
dotenv.config()
import { env } from "process"

import express from "express"
import signupRoute from "./routes/signup"
import loginRoute from "./routes/login"
import toolsRoute from "./routes/Common/toolsData"
import showUsersRoute from "./routes/Common/allUsers"
import errorHandler from "./middlewares/errorHandler"
import notFound from "./routes/notFound"
import mongoose from "mongoose"
import cors from "cors"
// => JWT Guard
import checkJWT from "./middlewares/auth/checkJWT"

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// -> User Routes
app.use("/signup", checkJWT, signupRoute) // => Signup Route
app.use("/login", checkJWT, loginRoute) // => Login Route

// -> Common Routes
app.use("/tools", toolsRoute) // => Tools Data
app.use("/users", showUsersRoute) // => Get Users Data
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

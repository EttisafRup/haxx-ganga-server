console.clear()
import express from "express"
import signup from "./routes/signup"
import errorHandler from "./middlewares/errorHandler"
import notFound from "./routes/notFound"
// import login from "./routes/login"

const app = express()

// => Signup Route
app.use("/v1", signup)

// => Login Route
// app.use("/login", login)

// ! Not Found Route
app.use(notFound)
// ! Error handling
app.use(errorHandler)

app.listen(5000, () => {
  console.log(`Server is listening on http://localhost:5000/`)
})

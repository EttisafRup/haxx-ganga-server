import express from "express"
const signupRoute = express.Router()

signupRoute.get("/", (req, res) => {
  res.json({ Ok: "message" })
})
signupRoute.post("/")

export default signupRoute

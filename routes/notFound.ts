import express from "express"
const notFoundRouter = express.Router()

notFoundRouter.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Oops, looks like you're lost in space!",
  })
})

export default notFoundRouter

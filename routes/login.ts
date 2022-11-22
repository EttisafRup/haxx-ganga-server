import express from "express"
import logUserController from "../controllers/logUser.login"
const loginRouter = express.Router()

loginRouter.post("/", logUserController)

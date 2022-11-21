import express from "express"
import showUsersController from "../../controllers/showUsersController"
const showUsersRoute = express.Router()

showUsersRoute.get("/", showUsersController)

export default showUsersController

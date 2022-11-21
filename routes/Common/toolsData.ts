import express from "express"
import toolsController from "../../controllers/toolsController"
const toolsRouter = express.Router()

toolsRouter.get("/", toolsController)
export default toolsRouter

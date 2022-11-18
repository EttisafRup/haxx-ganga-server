import express from "express"
import multer from "multer"
import addUser from "../controllers/addUser.signup"
import { filterFields, checkErrors } from "../middlewares/validator"
const upload = multer()

const signupRoute = express.Router()

signupRoute.get("/", (req, res) => {
  res.json({ Ok: "message" })
})
signupRoute.post("/", upload.none(), filterFields, checkErrors, addUser)

export default signupRoute

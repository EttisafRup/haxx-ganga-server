import express from "express"
import multer from "multer"
import { addUser, verifyUser } from "../controllers/addUser.signup"
import { filterFields, checkErrors } from "../middlewares/validator"
const upload = multer()

const signupRoute = express.Router()

signupRoute.post("/", upload.none(), filterFields, checkErrors, addUser)
signupRoute.post("/otp-check", upload.none(), verifyUser)

export default signupRoute

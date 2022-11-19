import express from "express"
import multer from "multer"
import { addUser, verifyUser } from "../controllers/addUser.signup"
import { filterFields, checkErrors } from "../middlewares/validator"
const upload = multer()

const signupRoute = express.Router()

signupRoute.get("/", (req, res) => {
  res.json({ Ok: "message" })
})
signupRoute.get("/otp-check", (req, res) => {
  res.json({ Ok: "OTP" })
})
signupRoute.post("/", upload.none(), filterFields, checkErrors, addUser)
signupRoute.post("/otp-check", upload.none(), verifyUser)

export default signupRoute

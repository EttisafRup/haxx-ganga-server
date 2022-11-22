import { check, validationResult } from "express-validator"
import { Request } from "express-validator/src/base"
import createHttpError from "http-errors"
import User from "../models/user.Schema"

export const filterFields = [
  check("username")
    .isLength({ min: 1, max: 20 })
    .withMessage("Your name must contain alphabets among 1 to 20!")
    .isAlpha("en-US", { ignore: " */$-~!+=_()[]{}" })
    .withMessage("Your name should not contain special characters!")
    .replace(/\s/g, "")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Please provide a valid Email address!")
    .trim()
    .custom(async (v) => {
      const email = v
      try {
        const emailAlreadyUsed = await User.findOne({ email: email })
        if (emailAlreadyUsed) {
          throw createHttpError("Email is already used!")
        }
      } catch (err: any) {
        throw createHttpError(err.message)
      }
    }),

  check("mobile").custom(async (v) => {
    const mobile = v
    try {
      const mobileAlreadyUsed = await User.findOne({ mobile: mobile })
      if (mobileAlreadyUsed) {
        throw createHttpError("Mobile number is already used!")
      }
    } catch (err: any) {
      throw createHttpError(err.message)
    }
  }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Your password should be at least 8 characters long!"),
]

export const checkErrors = (req: Request, res: any, next: any) => {
  const errors = validationResult(req)
  const decoratedErrors = errors.mapped()
  if (Object.keys(decoratedErrors).length === 0 || req.body.length === 1) {
    next()
  } else {
    console.log("BALER ERRORS")
    console.log(decoratedErrors)
    res.json({ status: 400, err: decoratedErrors })
  }
}

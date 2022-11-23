import User from "../models/user.Schema"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const loginRouteController = async (req: any, res: any) => {
  if (req.signedCookies.auth || "") {
    const isValidToken: any = jwt.verify(
      req.signedCookies.auth,
      process.env.COOKIE_TOKEN!
    )
    const isValidUserFromToken = await User.findOne({
      email: isValidToken.email,
    })
    if (isValidUserFromToken) {
      res.json({ Ok: "Ok" })
    }
  }
  try {
    const checkUser = await User.findOne({ email: req.body.email })
    if (checkUser) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        checkUser.password
      )
      if (isValidPassword) {
        const JWTToken = jwt.sign(
          { username: checkUser.username, email: checkUser.email },
          process.env.JWT_TOKEN!
        )
        res.cookie("auth", JWTToken, { signed: true, secure: true })
        res.json({
          tokenStatus: "SUCCESS!",
          success: "Token has been successfully set!",
        })
      }
    } else {
      res.json({ no_user: "User not found!!" })
    }
  } catch (err) {
    console.log(err)
    res.json({ err: "Something went wrong on the serverside!" })
  }
}

export default loginRouteController

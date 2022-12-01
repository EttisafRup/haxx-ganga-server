import User from "../models/user.Schema"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const loginRouteController = async (req: any, res: any) => {
  try {
    const { email, password } = req.body
    const checkUser = await User.findOne({ email })

    if (email === null) {
      res.status(400).json({ err: "Email or Password received empty!" })
    }

    console.log("myUser", checkUser)
    const isValidPassword = await bcrypt.compare(password, checkUser.password)
    if (checkUser && isValidPassword) {
      const JWTToken = jwt.sign(
        { username: checkUser.username, email: checkUser.email },
        process.env.JWT_TOKEN!
      )
      res.json({
        tokenStatus: "SUCCESS!",
        success: "Token has been successfully set!",
        token: JWTToken,
      })
    }
  } catch (err) {
    console.log(err)
    res.json({
      err: "Something went wrong on the serverside!",
      msg: "Email or Password might be invalid!",
    })
  }
}

export default loginRouteController

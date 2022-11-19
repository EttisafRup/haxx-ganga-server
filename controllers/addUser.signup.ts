import createHttpError from "http-errors"
import mongoose from "mongoose"
import User from "../models/user.Schema"
import bcrypt from "bcrypt"

const addUser = async (req: any, res: any) => {
  let newUser
  let hashedPassword
  if (res.type === "json") {
    hashedPassword = await bcrypt.hash(req.body[0].password, 10)
    newUser = new User({
      ...req.body[0],
      password: hashedPassword,
    })
  } else {
    hashedPassword = await bcrypt.hash(req.body.password, 10)
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    })
  }
  const userAlreadyExists = await User.findOne({ email: newUser.email })
  if (userAlreadyExists) {
    createHttpError("User Already Exists!")
  }
  try {
    await newUser.save()
    res.json({
      status: 200,
      message: "Signup was Successful!",
    })
  } catch (err: any) {
    console.log("PATH ERRORSs")
    res.json({ err: err.message })
    console.log(err)
  }
}

export default addUser

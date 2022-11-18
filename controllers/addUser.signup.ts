import createHttpError from "http-errors"
import mongoose from "mongoose"
import User from "../models/user.Schema"

const addUser = async (req: any, res: any) => {
  const newUser = new User({ ...req.body })
  const userAlreadyExists = await User.findOne({ email: newUser.email })
  if (userAlreadyExists) {
    createHttpError("User Already Exists!")
  }
  try {
    await newUser.save()
    res.json({
      status: 200,
      message: "User successfully added",
    })
  } catch (err: any) {
    console.log("PATH ERRORSs")
    res.json({ err: err.message })
    console.log(err)
  }
}

export default addUser

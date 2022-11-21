import { Document, Types } from "mongoose"
import User from "../models/user.Schema"
const showUsersController = async (
  req: any,
  res: {
    json: (arg0: {
      users: (Document<
        unknown,
        any,
        {
          avatar: string
          username: string
          email: string
          mobile: string
          gender: "male" | "female"
          password: string
        }
      > & {
        avatar: string
        username: string
        email: string
        mobile: string
        gender: "male" | "female"
        password: string
      } & { _id: Types.ObjectId })[]
    }) => void
  }
) => {
  const getAllUsers = await User.find({}).select({
    _id: 0,
    avatar: 1,
    username: 1,
    gender: 1,
  })
  res.json({ users: getAllUsers })
}
export default showUsersController

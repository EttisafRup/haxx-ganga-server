import createHttpError from "http-errors"
import mongoose from "mongoose"
import User from "../models/user.Schema"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import otpgenerator from "otp-generator"

let hashedPassword
let newUser: any
const userOTP = otpgenerator.generate(6, {
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
})

const jsonMessage = {
  signupSuccess: { status: 200, message: "Signup was successful" },
  emailSuccess: { success: "Email was sent!" },
  serversideError: { err: "Something Went Wrong" },
}

export const addUser = async (req: any, res: any) => {
  const mailSetup = [
    {
      service: "gmail",
      auth: {
        user: `${process.env.MAILSENDER}`,
        pass: `${process.env.MAILSENDERPASSWORD}`,
      },
    },
    {
      from: `${process.env.MAILSENDER}`,
      to: `${req.body.email}`,
      subject: `Verification Mail - haxxGanga`,
      text: `${userOTP}`,
    },
  ]
  const transporter = nodemailer.createTransport(mailSetup[0])
  let mailOptions

  if (Array.isArray(req.body)) {
    console.log("HI IM ARR")
    console.log(req.body[0])
    hashedPassword = await bcrypt.hash(req.body[0].password, 10)
    newUser = {
      ...req.body[0],
      password: hashedPassword,
    }
    mailOptions = { ...mailSetup[1], to: `${req.body[0].email}` }
  } else {
    hashedPassword = await bcrypt.hash(req.body.password, 10)
    newUser = {
      ...req.body,
      password: hashedPassword,
    }
    mailOptions = { ...mailSetup[1], to: `${req.body.email}` }
  }

  try {
    transporter.sendMail(
      mailOptions,
      function (error: any, info: { response: string }) {
        if (error) {
          console.log(error)
        } else {
          console.log("Email sent: " + info.response)
          res.json({ ...jsonMessage.emailSuccess })
        }
      }
    )
  } catch (err: any) {
    console.log("PATH ERRORSs")
    res.json({ err: err.message })
    console.log(err)
  }
}

export const verifyUser = async (req: any, res: any) => {
  const saveUser = new User({ ...newUser })
  try {
    console.log(req.body)
    if (Array.isArray(req.body) && userOTP === req.body[0].otp) {
      console.log("HI")
      await saveUser.save()
      res.json({ ...jsonMessage.signupSuccess })
    } else if (Object.keys(req.body).length >= 0 && userOTP === req.body.otp) {
      console.log("HELLO")
      await saveUser.save()
      res.json({ ...jsonMessage.signupSuccess })
    } else {
      res.json({ XD: "XDDDD" })
    }
  } catch (err) {
    res.json({ ...jsonMessage.serversideError })
    console.log(err)
  }
}

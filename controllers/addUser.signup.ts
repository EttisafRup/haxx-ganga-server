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
      html: ` <div style="
      text-align: center;
      letter-spacing: 0.3rem;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
      
  </div>
  <h1>ha<span style="color: red">x</span>xGanga - Your Hack Assistant!</h1>
  
  <label style="
  font-weight: bolder;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  "> As Salamu Alaikum,
  </label>
  <p>Thanks for reaching out to us! Welcome to <b>haxxGanga - Your Hack Assistant!</b> Your Verification Code is :</p>
  
  <label style="
  font-size: 3rem;
  letter-spacing: 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  justify-content: center;
  display: flex;
  "> ${userOTP} </label>`,
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
    console.log({ ...newUser })
    transporter.sendMail(
      mailOptions,
      function (error: any, info: { response: string }) {
        if (error) {
          console.log(error)
        } else {
          console.log("Email sent: " + info.response)
          res.json({ success: "Email was sent!" })
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
  const avatarUser = newUser.username.split(" ").join("")
  const saveUser = new User({
    ...newUser,
    avatar: `https://avatars.githubusercontent.com/${avatarUser}`,
  })
  try {
    if (
      Array.isArray(req.body) &&
      userOTP === req.body[0].otp.replace(/\s/g, "")
    ) {
      console.log("HI")
      await saveUser.save()
      res.json({ status: 200, message: "Signup was successful" })
    } else if (
      Object.keys(req.body).length >= 0 &&
      userOTP === req.body.otp.replace(/\s/g, "")
    ) {
      console.log("HELLO")
      await saveUser.save()
      res.json({ status: 200, message: "Signup was successful" })
    } else {
      res.json({ XD: "XDDDD" })
    }
  } catch (err) {
    res.json({ err: "Something Went Wrong" })
    console.log(err)
  }
}

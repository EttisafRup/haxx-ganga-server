import jwt from "jsonwebtoken"

const checkJWT = (req: any, res: any) => {
  const { auth } = req.headers
  if (!auth) {
    res.json({
      auth: "Cannot find headers 'Auth', make sure you've sent it correctly!",
    })
  } else {
    console.log("AUTH", auth)
    try {
      const verifyJWT = jwt.verify(auth, process.env.JWT_TOKEN || "ASAKJSH")
      const { username, email } = Object(verifyJWT)
      if (verifyJWT) {
        res.json({
          success: true,
          msg: "User was authenticated!",
          username,
          email,
        })
      } else {
        res.json({
          success: false,
          msg: "Auth token was corrupted, please logout and login again!",
        })
      }
    } catch (err: any) {
      console.log(err)
      res.json({
        msg: "Something went wrong on the serverside",
        err: err.message,
      })
    }
  }
}

export default checkJWT

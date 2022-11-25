function errorHandler(err: any, req: any, res: any) {
  if (err) {
    res.status(400).json({
      status: "Bad Request!",
      message: "Something Went Wrong in the Serverside",
    })
  } else {
    res.disconnect()
  }
}

export default errorHandler

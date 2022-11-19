function errorHandler(
  err: any,
  req: any,
  res: { json: (arg0: { status: string; message: string }) => void },
  next: () => void
) {
  if (err) {
    res.json({
      status: "Bad Request!",
      message: "Something Went Wrong in the Serverside",
    })
  } else {
    next()
  }
}

export default errorHandler

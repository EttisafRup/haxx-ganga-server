import express from "express"
import multer from "multer"
import { HttpError as createError } from "http-errors"
import path from "path"

function uploader(
  avatar: string,
  filetype: string[],
  filesize: number,
  error: any
) {
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${avatar}`

  const storage = multer.diskStorage({
    destination: (
      req: any,
      file: any,
      cb: (arg0: null, arg1: string) => void
    ) => {
      cb(null, UPLOAD_FOLDER)
    },
    filename: (
      req: any,
      file: { originalname: any },
      cb: (arg0: null, arg1: string) => void
    ) => {
      const fileExt = path.extname(file.originalname)
      const uniqueID =
        "Ettisaf_Rup" + Date.now() + "_" + Math.round(Math.random() * 1e6)
      cb(null, uniqueID + fileExt)
    },
  })

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: filesize,
    },
    fileFilter: (
      req: any,
      file: { mimetype: any },
      cb: (arg0: null | Object, arg1?: boolean | undefined) => void
    ) => {
      if (filetype.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(createError(error))
      }
    },
  })

  return upload
}

export default uploader

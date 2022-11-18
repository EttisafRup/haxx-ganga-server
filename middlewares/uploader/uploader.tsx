// => Currently We are not going to use this because of cheap server providor. :)

// import uploader from "../../utilities/single.uploader"

// const avatarUpload = (req, res, next) => {
//   const uploadFile = uploader(
//     "avatar",
//     ["image/jpg", "image/jpeg", "image/png"],
//     1000000,
//     "Unsupported File Format, please try again with .jpg .jpeg and .png formats"
//   )

//   uploadFile.any()(req, res, (err) => {
//     if (err) {
//       console.log(err)
//       res.json({
//         error: {
//           avatars: {
//             message: err.message,
//           },
//         },
//       })
//     } else {
//       next()
//     }
//   })
// }

// export default avatarUpload

import multer from "multer";

export const upload = multer({
    storage: multer.diskStorage({
    destination(req, file, callback) {
    callback(null, "public/");
  },
    filename(req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, Date.now()+ "." + extension);
    },
  }),
});
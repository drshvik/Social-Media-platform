const jwt = require("jsonwebtoken");
const models = require("./models");
const multer = require("multer");
const User = models.User;
const key = "lambda";

exports.loginMiddleWare = async (req, res, next) => {
  const s = req.headers.authorization;
  const token = s.split(" ")[1];
  if (!token) {
    res.status(401).send("You are not Authorised");
    return;
  }
  try {
    const username = jwt.verify(token, key).username;
    const user = await User.findOne({ username });
    if (user) {
      next();
    } else {
      res.send("Please Login");
      return;
    }
  } catch (e) {
    res.status(401).send("Invalid Token");
    return;
  }
};

const postImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/postImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
exports.uploadPostImage = multer({
  storage: postImageStorage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const profileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
exports.uploadProfileImage = multer({
  storage: profileImageStorage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const jwt = require("jsonwebtoken");
const models = require("./models");
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

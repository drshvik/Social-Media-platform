const controller = require("./controller");
const middlewares = require("./middlewares");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
app.post("/signup", controller.signup);
app.post("/login", controller.login);
app.get("/posts", middlewares.loginMiddleWare, controller.posts);
app.get("/post/:id", middlewares.loginMiddleWare, controller.viewpost);
app.get("/user/:id", middlewares.loginMiddleWare, controller.userprofile);
app.get("/myprofile", middlewares.loginMiddleWare, controller.myprofile);
app.put("/editprofile", middlewares.loginMiddleWare, controller.editprofile);
app.get("/followers/:id", middlewares.loginMiddleWare, controller.followers);
app.get("/following/:id", middlewares.loginMiddleWare, controller.following);
app.post("/follow/:id", middlewares.loginMiddleWare, controller.follow);
app.post("/unfollow/:id", middlewares.loginMiddleWare, controller.unfollow);
app.post("/like/:id", middlewares.loginMiddleWare, controller.like);
app.post("/comment/:id", middlewares.loginMiddleWare, controller.comment);
app.post(
  "/addpost",
  middlewares.loginMiddleWare,
  upload.single("image"),
  controller.addPost
);
app.post("/editpost/:id", middlewares.loginMiddleWare, controller.editPost);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

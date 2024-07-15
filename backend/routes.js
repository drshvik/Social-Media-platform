const controller = require("./controller");
const middlewares = require("./middlewares");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/signup", controller.signup);
app.post("/login", controller.login);
app.post("/logout", middlewares.loginMiddleWare, controller.logout);
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
app.post("/addpost", middlewares.loginMiddleWare, controller.addPost);
app.post("/editpost/:id", middlewares.loginMiddleWare, controller.editPost);

app.listen(3000);

const models = require("./models");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();
const key = process.env.JWT_SECRET;
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;
const Like = models.Like;
const { ObjectId } = require("mongodb");
const FileReader = require("filereader");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

async function convertImage(imagePath) {
  try {
    const data = await fs.promises.readFile(imagePath);
    const base64Image = Buffer.from(data).toString("base64");
    const dataURL = `data:image/jpeg;base64,${base64Image}`;
    return dataURL;
  } catch (e) {
    console.log(e);
  }
}

exports.signup = async (req, res) => {
  const validUser = zod.object({
    name: zod.string(),
    username: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(8),
  });
  const userValidation = validUser.safeParse(req.body);
  if (!userValidation.success) {
    res.send("Invalid User Data");
    return;
  }
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    res.status(409).send("Username already exists");
    return;
  } else {
    User.create({
      ...req.body,
      image: "./uploads/userplaceholder.jpeg",
      followers: [],
      following: [],
      posts: [],
    }).then(() => res.status(201).send("User added Successfully"));
  }
};

exports.login = async (req, res) => {
  const validUser = zod.object({
    username: zod.string(),
    password: zod.string().min(8),
  });
  const userValidation = validUser.safeParse(req.body);
  if (!userValidation.success) {
    res.send("Invalid User");
    return;
  }
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.send("You are not there in our dataBase");
    return;
  }
  if (user.password !== password) {
    console.log(user.password);
    console.log(password);
    res.send("Invalid Password");
    return;
  }
  const token = jwt.sign({ username }, key);
  res.json({ token, success: true });
};

exports.posts = async (req, res) => {
  const allPosts = await Post.find();
  const posts = await Promise.all(
    allPosts.map(async (post, index) => {
      const user = await User.findOne({ _id: post.createdBy });
      const imagePath = path.resolve(post.image);
      post.image = await convertImage(imagePath);
      const imagePath1 = path.resolve(user.image);
      user.image = await convertImage(imagePath1);
      post.createdBy = user;
      return post;
    })
  );
  res.json(posts);
};

exports.viewpost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  const userID = post.createdBy;
  const user = await User.findOne({ _id: userID });
  const imagePath = path.resolve(post.image);
  post.image = await convertImage(imagePath);
  const imagePath1 = path.resolve(user.image);
  user.image = await convertImage(imagePath1);
  post.createdBy = user;
  res.json({ post, prevImage: imagePath });
};

exports.userprofile = async (req, res) => {
  const s = req.params.id;
  if (!ObjectId.isValid(s)) {
    return res.status(400).send("Invalid user ID format");
  }
  const id = new ObjectId(s);
  const user = await User.findById(id).populate("followers following", "name");
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  const imagePath = path.resolve(user.image);
  user.image = await convertImage(imagePath);
  res.json(user);
};

exports.myprofile = async (req, res) => {
  try {
    const username = jwt.decode(
      req.headers.authorization.split(" ")[1]
    ).username;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const imagePath = path.resolve(user.image);
    user.image = await convertImage(imagePath);

    res.json({ user, prevImage: imagePath });
  } catch (err) {
    console.error("Error in myprofile:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.editprofile = async (req, res) => {
  const placeholderImage = "/uploads/userplaceholder.jpeg";
  const prevImage = req.body.prevImage;
  let imagePath = req.file ? req.file.path : prevImage || placeholderImage;
  const parts = imagePath.split("uploads");
  imagePath = `uploads${parts[1]}`;
  let del = false;

  if (!prevImage.includes(imagePath) && imagePath !== placeholderImage) {
    del = true;
  }
  delete req.body.prevImage;
  const updatedUser = { ...req.body, image: imagePath };
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const user = await User.findOneAndUpdate({ username }, updatedUser, {
    new: false,
  });
  if (del) {
    fs.unlinkSync(prevImage, (e) => {
      if (e) console.log(e);
      console.log("Updated Succesfully");
    });
  }
  res.json(user);
};

exports.followers = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  const followers = await Promise.all(
    user.followers.map(async (userID, index) => {
      const user = await User.findOne({ _id: userID });
      const imagePath = path.resolve(user.image);
      user.image = await convertImage(imagePath);
      return user;
    })
  );
  res.json(followers);
};

exports.following = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  const following = await Promise.all(
    user.following.map(async (userID, index) => {
      const user = await User.findOne({ _id: userID });
      const imagePath = path.resolve(user.image);
      user.image = await convertImage(imagePath);
      return user;
    })
  );
  res.json(following);
};

exports.follow = async (req, res) => {
  const id = req.params.id;
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const user = await User.findOne({ username });
  const targetUser = await User.findById(id);
  if (!user || !targetUser) {
    res.status(404).send("User not found");
    return;
  }
  user.following.push(targetUser._id);
  targetUser.followers.push(user._id);
  await user.save();
  await targetUser.save();
  res.send("Followed successfully");
};

exports.unfollow = async (req, res) => {
  const id = req.params.id;
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const user = await User.findOne({ username });
  const targetUser = await User.findById(id);
  if (!user || !targetUser) {
    res.status(404).send("User not found");
    return;
  }
  user.following = user.following.filter(
    (followingId) => followingId.toString() !== id
  );
  targetUser.followers = targetUser.followers.filter(
    (followerId) => followerId.toString() !== user._id.toString()
  );
  await user.save();
  await targetUser.save();
  res.send("Unfollowed successfully");
};

exports.like = async (req, res) => {
  const id = req.params.id;
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const user = await User.findOne({ username });
  const post = await Post.findById(id);
  if (!user || !post) {
    res.status(404).send("Post or User not found");
    return;
  }
  const like = await Like.findOne({ postId: id, likedBy: user._id });
  if (!like) {
    const like = await Like.create({ postId: id, likedBy: user._id, likes: 1 });
    const updatedLikes = post.likes.push(like._id);
    post.likes = updatedLikes;
    const updatedPost = await Post.findOneAndUpdate({ _id: id }, post, {
      new: false,
    });
  }
  res.send("Liked successfully");
};

exports.unlike = async (req, res) => {
  const id = req.params.id;
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const user = await User.findOne({ username });
  const post = await Post.findById(id);
  if (!user || !post) {
    res.status(404).send("Post or User not found");
    return;
  }
  const like = await Like.findOne({ postId: id, likedBy: user._id });
  if (like) {
    const updatedLikes = post.likes.filter((like, index) => {
      return like !== like._id;
    });
    post.likes = updatedLikes;
    const updatedPost = await Post.findOneAndUpdate({ _id: id }, post, {
      new: false,
    });
    const deleted = await Like.deleteOne({ _id: like._id });
  }
  res.send("UnLiked successfully");
};

exports.comment = async (req, res) => {
  const validComment = zod.object({
    content: zod.string(),
  });
  const commentValidation = validComment.safeParse(req.body);
  if (!commentValidation.success) {
    res.send("Invalid Comment Data");
    return;
  }
  const id = req.params.id;
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const user = await User.findOne({ username });
  const post = await Post.findById(id);

  if (!user || !post) {
    res.status(404).send("Post or User not found");
    return;
  }

  const newComment = new Comment({
    content: req.body.content,
    commentedBy: user._id,
    postId: post._id,
  });

  await newComment.save();
  res.send("Comment added successfully");
};

exports.addPost = async (req, res) => {
  try {
    const validPost = zod.object({
      caption: zod.string(),
    });
    const postValidation = validPost.safeParse(req.body);
    if (!postValidation.success) {
      return res.status(400).send("Invalid Post Data");
    }

    const imagePath = req.file ? req.file.path : "uploads/postplaceholder.jpeg";
    const username = jwt.decode(
      req.headers.authorization.split(" ")[1]
    ).username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const newPost = new Post({
      caption: req.body.caption,
      image: imagePath,
      createdBy: user._id,
    });

    await newPost.save();
    user.posts.push(newPost._id);
    await user.save();
    res.status(201).send(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.editPost = async (req, res) => {
  try {
    const placeholderImage = "/uploads/postplaceholder.jpeg";
    const prevImage = req.body.prevImage;
    let imagePath = req.file ? req.file.path : prevImage || placeholderImage;
    const parts = imagePath.split("uploads");
    imagePath = `uploads${parts[1]}`;
    let del = false;

    if (!prevImage.includes(imagePath) && imagePath !== placeholderImage) {
      del = true;
    }
    delete req.body.prevImage;
    const updatedPost = { ...req.body, image: imagePath };
    const username = jwt.decode(
      req.headers.authorization.split(" ")[1]
    ).username;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    const postId = req.params.id;
    let post = await Post.findOneAndUpdate(
      { _id: postId, createdBy: user._id },
      updatedPost,
      { new: false }
    );
    if (!post) {
      res.status(404).send("Something went wrong");
      return;
    }
    if (del) {
      fs.unlinkSync(prevImage, (e) => {
        if (e) console.log(e);
        console.log("Updated Succesfully");
      });
    }
    res.send("Post updated successfully");
  } catch (e) {
    console.log(e);
  }
};

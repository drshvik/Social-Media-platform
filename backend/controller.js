const models = require("./models");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const key = "lambda";
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;
const Like = models.Like;
const { ObjectId } = require("mongodb");

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
      image: "",
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

exports.logout = (req, res) => {
  console.log(req.headers);
  req.headers = { ...req.headers, authorization: "" };
  console.log(req.headers);
  res.send("You are logged out Successfully");
};

exports.posts = async (req, res) => {
  const allPosts = await Post.find();
  res.json(allPosts);
};

exports.viewpost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate("createdBy", "name");
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.json(post);
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
  res.json(user);
};

exports.myprofile = async (req, res) => {
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const user = await User.findOne({ username }).populate(
    "followers following",
    "name"
  );
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user);
};

exports.editprofile = async (req, res) => {
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const updates = req.body;
  const user = await User.findOneAndUpdate({ username }, updates, {
    new: true,
  });
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user);
};

exports.followers = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate("followers", "name");
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user.followers);
};

exports.following = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate("following", "name");
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.json(user.following);
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
    await Like.create({ postId: id, likedBy: user._id, likes: 1 });
  }
  res.send("Liked successfully");
};

// exports.share = async (req, res) => {
//   const id = req.params.id;
//   const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
//   const user = await User.findOne({ username });
//   const post = await Post.findById(id);
//   if (!user || !post) {
//     res.status(404).send("Post or User not found");
//     return;
//   }
//   res.send("Post shared successfully");
// };

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
  const validPost = zod.object({
    caption: zod.string(),
    image: zod.string(),
  });
  const postValidation = validPost.safeParse(req.body);
  if (!postValidation.success) {
    res.send("Invalid Postgvhjgvhb Data");
    return;
  }
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  const newPost = new Post({
    caption: req.body.caption,
    image: req.body.image,
    createdBy: user._id,
    likes: [],
    comments: [],
  });
  await newPost.save();
  res.send("Post added successfully");
};

exports.editPost = async (req, res) => {
  const validPost = zod.object({
    caption: zod.string(),
    image: zod.string(),
  });
  const postValidation = validPost.safeParse(req.body);
  if (!postValidation.success) {
    res.send("Invalid Post Data");
    return;
  }
  const username = jwt.decode(req.headers.authorization.split(" ")[1]).username;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  if (post.createdBy.toString() !== user._id.toString()) {
    res.status(403).send("Unauthorized");
    return;
  }
  post.caption = req.body.caption;
  post.image = req.body.image;

  await post.save();
  res.send("Post updated successfully");
};
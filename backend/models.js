const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:admin%40123@study.rfws1gk.mongodb.net/socialapp"
  )
  .then(() => console.log("connected to mongo db"));

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  image: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const postSchema = new mongoose.Schema(
  {
    caption: String,
    image: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const commentSchema = new mongoose.Schema(
  {
    content: String,
    commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  {
    timestamps: true,
  }
);

const likeSchema = new mongoose.Schema({
  likes: Number,
  likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

exports.User = mongoose.model("User", userSchema);
exports.Post = mongoose.model("Post", postSchema);
exports.Comment = mongoose.model("Comment", commentSchema);
exports.Like = mongoose.model("Like", likeSchema);

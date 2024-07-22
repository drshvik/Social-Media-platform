import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faShare,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import api from "../../../axiosConfig";

export function Post({ post, loggedInUser }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(
    likes.some((like) => like.likedBy === loggedInUser._id)
  );

  const handleLike = async () => {
    try {
      if (liked) {
        const url = `/unlike/${post._id}`;
        const res = await api.post(url);
        setLiked(false);
        setLikes(likes.filter((like) => like.likedBy !== loggedInUser._id));
      } else {
        const url = `/like/${post._id}`;
        const res = await api.post(url);
        setLiked(true);
        setLikes([...likes, { likedBy: loggedInUser._id }]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const posturl = `/post/${post._id}`;
  return (
    <div className="bg-white p-6 rounded-lg mb-6 w-full md:w-3/5">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full"
          src={post.createdBy.image}
          alt="User Image"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{post.createdBy.username}</h3>
          <p className="text-gray-500 text-sm">{post.createdAt}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{post.caption}</p>
      <Link to={posturl}>
        <img
          src={post.image}
          alt="Post Image"
          className="w-full h-auto object-cover rounded-lg"
        />
      </Link>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          {liked ? (
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleLike}
            >
              <FontAwesomeIcon icon={faHeartSolid} /> {likes.length}
            </button>
          ) : (
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleLike}
            >
              <FontAwesomeIcon icon={faHeartRegular} /> {likes.length}
            </button>
          )}
          <button className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faComment} /> {post.comments.length}
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faBookmark} />
        </button>
      </div>
    </div>
  );
}

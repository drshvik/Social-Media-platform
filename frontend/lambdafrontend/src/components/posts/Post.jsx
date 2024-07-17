import { Link } from "react-router-dom";

export function Post({ post }) {
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
          <button className="text-red-500 hover:text-red-700">
            <i className="fas fa-heart"></i> {post.likes.length}
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-comment"></i> {post.comments.length}
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-share"></i>
          </button>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-bookmark"></i>
        </button>
      </div>
    </div>
  );
}

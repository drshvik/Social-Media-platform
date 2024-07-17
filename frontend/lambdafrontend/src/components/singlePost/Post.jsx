import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export function Post({ post }) {
  return (
    <div className="flex-1 p-6 ml-56">
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

        <img
          src={post.image}
          alt="Post Image"
          className="w-full h-auto object-cover rounded-lg"
        />

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <button className="text-red-500 hover:text-red-700">
              <FontAwesomeIcon icon={faHeart} /> {post.likes.length}
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
    </div>
  );
}

export function Interactions({ post }) {
  return (
    <div>
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

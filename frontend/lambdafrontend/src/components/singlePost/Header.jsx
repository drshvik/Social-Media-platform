export function Header({ post }) {
  return (
    <div>
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full"
          src="/images/2.jpeg"
          alt={post.createdBy.image}
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{post.createdBy.username}</h3>
          <p className="text-gray-500 text-sm">{post.createdAt}</p>
        </div>
      </div>
    </div>
  );
}

export function Post({ post }) {
  return (
    <div>
      <a href="#">
        <img
          src={post.image}
          alt="Post Image"
          className="w-full h-96 object-cover rounded-lg"
        />
      </a>
    </div>
  );
}

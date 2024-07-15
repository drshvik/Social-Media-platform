import { Post } from "./Post";

export function Posts({ posts }) {
  return (
    <div>
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post, index) => {
            return <Post key={index} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

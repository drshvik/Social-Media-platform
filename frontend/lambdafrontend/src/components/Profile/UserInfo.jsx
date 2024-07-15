export function UserInfo({ user }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-32 h-32 rounded-2xl"
            src="/images/1.jpeg"
            alt="Profile Picture"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold">{user.username}</h2>
            <p className="text-gray-500">{user.name}</p>
          </div>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
          Follow
        </button>
      </div>
      <div className="flex justify-evenly mt-8">
        <div className="text-center">
          <h3 className="text-xl font-bold">{user.posts.length}</h3>
          <p className="text-gray-500">Posts</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">{user.followers.length}</h3>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">{user.following.length}</h3>
          <p className="text-gray-500">Following</p>
        </div>
      </div>
    </div>
  );
}

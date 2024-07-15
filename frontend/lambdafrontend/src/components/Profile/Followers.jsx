export function Followers({ users }) {
  return (
    <div id="followers" className="hidden mt-8">
      <ul className="space-y-4">
        {users.map((user, index) => {
          return <Follower key={index} user={user} />;
        })}
      </ul>
    </div>
  );
}

const Follower = ({ user }) => {
  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <div className="flex items-center">
        <img
          className="w-16 h-16 rounded-full"
          src={user.image}
          alt="Follower Profile Picture"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
        Remove Follower
      </button>
    </li>
  );
};

import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../axiosConfig";

export function UserInfo({ user }) {
  async function getUserID() {
    const url = "/myprofile";
    const res = await api.get(url);
    const userid = res.data._id;
    return userid;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-32 h-32 rounded-2xl"
            src={user.image}
            alt="Profile Picture"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold">{user.username}</h2>
            <p className="text-gray-500">{user.name}</p>
          </div>
        </div>
        {window.location.pathname === "/myprofile" ? (
          <Link
            to="/editprofile"
            className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
          >
            Edit Profile
          </Link>
        ) : user.followers.includes(getUserID()) ? (
          <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600">
            UnFollow
          </button>
        ) : (
          <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600">
            Follow
          </button>
        )}
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

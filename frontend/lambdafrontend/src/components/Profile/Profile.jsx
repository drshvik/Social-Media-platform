import { Sidebar } from "/src/components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { getToken } from "../../../tokenUtils.js";
import { Loading } from "../Loading.jsx";
import { UserInfo } from "./UserInfo.jsx";
import api from "../../../axiosConfig.js";
import { Posts } from "./Posts.jsx";
import { Following } from "./Following.jsx";
import { Followers } from "./Followers.jsx";

export function Profile() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userFollows, setUserFollows] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUser() {
      const token = getToken();
      try {
        const url = "/myprofile";
        const response = await api.get(url);
        console.log("Response data:", response.data);
        const loggedInUser = await response.data.user;
        setUser(loggedInUser);
        const userPosts = await Promise.all(
          loggedInUser.posts.map((post) => {
            async function fetchPost(id) {
              const url = "/post/" + id;
              const response = await api.get(url);
              return response.data;
            }
            return fetchPost(post);
          })
        );
        const userFollowers = await Promise.all(
          loggedInUser.following.map((user) => {
            async function fetchFollower(id) {
              const url = "/user/" + id;
              const response = await api.get(url);
              return response.data;
            }
            return fetchFollower(user);
          })
        );
        const userFollowing = await Promise.all(
          loggedInUser.following.map((user) => {
            async function fetchFollowedUser(id) {
              const url = "/user/" + id;
              const response = await api.get(url);
              return response.data;
            }
            return fetchFollowedUser(user);
          })
        );
        setUserFollows(userFollowing);
        setUserFollowers(userFollowers);
        setUserPosts(userPosts);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getUser();
  }, []);

  function unfollow() {
    return;
  }

  function removeFollower() {
    return;
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-gray-100">
      <div className="bg-white flex w-full">
        <div className="w-1/5 fixed bg-white h-screen shadow-md p-6 flex flex-col justify-between">
          <Sidebar />
        </div>

        <div className="flex-1 ml-96 mr-96 w-40 p-6">
          <div className="container mx-auto py-10">
            <UserInfo user={user} />
            <div className="mt-8">
              <div className="flex justify-evenly space-x-8 border-b-2 pb-2">
                <button className="text-gray-800 font-semibold border-b-4 border-green-500">
                  Posts
                </button>
                <button className="text-gray-500 hover:text-gray-800">
                  Followers
                </button>
                <button className="text-gray-500 hover:text-gray-800">
                  Following
                </button>
              </div>
            </div>
            <Posts posts={userPosts} />
            <Followers users={userFollowers} removeFollower={removeFollower} />
            <Following users={userFollows} unfollow={unfollow} />
          </div>
        </div>
      </div>
    </div>
  );
}

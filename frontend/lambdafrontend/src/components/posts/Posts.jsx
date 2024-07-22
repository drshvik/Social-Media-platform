import { Sidebar } from "../sidebar/Sidebar";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import { Post } from "./Post";
import { Loading } from "../Loading";
export function Posts() {
  const url = "http://localhost:3000/posts";
  const userurl = "http://localhost:3000/user/";
  const [posts, setPosts] = useState([]);
  const [loggedInUser, setLoggedinUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      async function fetchUser() {
        console.log("I am In");
        const url = "/myprofile";
        const res = await api.get(url);
        const user = res.data;
        setLoggedinUser(user);
        console.log(res.data);
      }
      fetchUser();
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        const postsData = response.data;
        console.log(postsData);
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-white flex w-full">
        <Sidebar />
        <div className="flex-1 ml-80 p-6">
          <div className="container mx-auto">
            <div className="bg-white p-8 rounded-lg divide-y">
              {posts.map((post, index) => (
                <Post key={index} post={post} loggedInUser={loggedInUser} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

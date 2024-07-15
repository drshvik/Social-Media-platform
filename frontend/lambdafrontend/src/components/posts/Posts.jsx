import { Sidebar } from "../sidebar/Sidebar";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import { Post } from "./Post";
import { Loading } from "../Loading";
export function Posts() {
  const url = "http://localhost:3000/posts";
  const userurl = "http://localhost:3000/user/";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        const postsData = response.data;

        const updatedPosts = await Promise.all(
          postsData.map(async (post) => {
            const userResponse = await api.get(`${userurl}${post.createdBy}`);
            post.createdBy = userResponse.data;
            console.log(post);
            return post;
          })
        );
        setPosts(updatedPosts);
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
                <Post key={index} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <script
        src="https://kit.fontawesome.com/911b160e40.js"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
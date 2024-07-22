import { useEffect, useState } from "react";
import { Post } from "./Post";
import { Sidebar } from "/src/components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import api from "../../../axiosConfig";
import { Loading } from "../Loading";

export function SinglePost() {
  const [post, setPost] = useState({});
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  const [loggedInUser, setLoggedinUser] = useState(null);
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
      const posturl = `./post/${id}`;
      const response = await api.get(posturl, {
        headers: { Accept: "application/json" },
      });
      setPost(response.data.post);
      setloading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-gray-100">
      <div className="bg-white flex w-full">
        <Sidebar />
        <Post post={post} loggedInUser={loggedInUser} />
      </div>
    </div>
  );
}

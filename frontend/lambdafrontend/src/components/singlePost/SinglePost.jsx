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
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const posturl = `./post/${id}`;
      const response = await api.get(posturl, {
        headers: { Accept: "application/json" },
      });
      console.log(response);
      setPost(response.data);
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
        <Post post={post} />
      </div>
    </div>
  );
}

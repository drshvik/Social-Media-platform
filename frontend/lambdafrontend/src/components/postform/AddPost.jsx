import { Sidebar } from "../sidebar/Sidebar";
import { useState } from "react";
import api from "../../../axiosConfig";
import placeholderImage from "./../../assets/images/postplaceholder.jpeg";
import { Link, useNavigate } from "react-router-dom";

export function AddPost() {
  const [input, setInput] = useState({
    caption: "",
    image: placeholderImage,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  function uploadImg() {
    const image = document.getElementById("postImage");
    image.click();
  }

  const Navigate = useNavigate();
  function openModal(e) {
    e.preventDefault();
    const modal = document.getElementById("cancelModal");
    modal.classList.remove("hidden");
  }

  function cancelEdit() {
    document.getElementById("cancelModal").classList.add("hidden");
    setInput({
      caption: "",
      image: placeholderImage,
    });
    setSelectedImage(null);
  }

  function cancelCancellation() {
    document.getElementById("cancelModal").classList.add("hidden");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", input.image);
    formData.append("caption", input.caption);

    try {
      const res = await api.post("/addpost", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(res);
      setInput({ caption: "", image: null, imagePreview: null });
      Navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInput({
          ...input,
          image: file,
        });
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1 ml-80 mr-96 w-40 p-6">
        <div className="container mx-auto py-10">
          <div className="flex justify-start mb-4">
            <button
              type="button"
              onClick={openModal}
              className="underline text-red-400 hover:text-red-600 focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
          </div>
          <h2 className="text-3xl font-normal mb-10">Add New Post</h2>
          <form
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <div className="mb-10 flex flex-col items-center">
              <label
                htmlFor="postImage"
                className="cursor-pointer relative w-96 h-64"
              >
                <img
                  src={selectedImage || input.image}
                  alt="Current Post Picture"
                  className="w-full h-full rounded-sm"
                />
                <button onClick={uploadImg}>
                  <i
                    className="fas fa-edit text-gray-700 absolute bottom-2 right-2 bg-white rounded-full p-2 cursor-pointer"
                    id="editIcon"
                  ></i>
                </button>
                <input
                  type="file"
                  id="postImage"
                  name="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor="postContent"
                className="block text-gray-700 font-normal mb-6"
              >
                Caption
              </label>
              <input
                id="caption"
                name="caption"
                value={input.caption}
                onChange={(e) => {
                  setInput({ ...input, caption: e.target.value });
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Post Caption"
              />
            </div>
            <div className="flex items-center mt-10 justify-between">
              <button
                type="button"
                onClick={openModal}
                className="bg-red-400 hover:bg-red-500 text-white font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 text-white font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        id="cancelModal"
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden"
      >
        <div className="relative top-1/4 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Cancel Add Post
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Are you sure you want to cancel?
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={cancelCancellation}
                className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                No
              </button>
              <Link
                to="/posts"
                onClick={cancelEdit}
                className="mt-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Yes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

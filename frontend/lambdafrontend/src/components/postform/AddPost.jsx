import { Sidebar } from "../sidebar/Sidebar";
import { useState } from "react";
import img20 from "../../assets/images/20.jpeg";
import api from "../../../axiosConfig";

export function AddPost() {
  function uploadImg() {
    const image = document.getElementById("postImage");
    image.click();
  }

  function openModal(e) {
    e.preventDefault();
    const modal = document.getElementById("cancelModal");
    modal.classList.remove("hidden");
  }

  function cancelEdit() {
    document.getElementById("cancelModal").classList.add("hidden");
    window.location.href = "your-redirect-url.html"; // Replace with the URL you want to redirect to
  }

  function cancelCancellation() {
    document.getElementById("cancelModal").classList.add("hidden");
  }

  const [input, setInput] = useState({ caption: "", image: img20 });

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
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    function changeInput() {
      setInput((input) => ({ ...input, image: e.target.files[0] }));
    }
    changeInput();
    console.log(input);
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
              className="underline text-red-500 hover:text-red-600 focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
          </div>
          <h2 className="text-3xl font-bold mb-6">Add New Post</h2>
          <form
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="postImage"
                className="cursor-pointer relative w-36 h-36"
              >
                <img
                  src={input.image}
                  alt="Current Profile Picture"
                  className="w-full h-full rounded-full"
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
                className="block text-gray-700 font-bold mb-2"
              >
                Caption
              </label>
              <input
                id="caption"
                name="caption"
                onChange={(e) => {
                  setInput({ ...input, caption: e.target.value });
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Post content"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={openModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
              <button
                onClick={cancelEdit}
                className="mt-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

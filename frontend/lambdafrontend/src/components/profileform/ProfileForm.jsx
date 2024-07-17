import { Sidebar } from "../sidebar/Sidebar";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import placeholderImage from "./../../assets/images/userplaceholder.jpeg";
import {Loading} from "../Loading.jsx";
import {useNavigate} from "react-router-dom";

export function ProfileForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    name: "",
    image: { placeholderImage },
    prevImage: null,
  });

  useEffect(() => {
    async function getCurrentUser() {
      const url = "/myprofile";
      try {
        const res = await api.get(url);
        const user = res.data.user;
        console.log(user);
        setInput({
          ...user, prevImage : res.data.prevImage
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getCurrentUser();
  }, []);
  function uploadImg() {
    const image = document.getElementById("image");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", input.username);
    formData.append("name", input.name);
    formData.append("image", input.image);
    formData.append("prevImage", input.prevImage);
    try {
      const res = await api.put("/editprofile", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      navigate('/myprofile')
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

  if(loading){
    return <Loading />
  }

  return (
    <div className="">
      <Sidebar />
      <div className="flex-1 ml-96  mr-96 p-6 min-h-screen ">
        <div className="container mx-auto py-10">
          <div className="flex justify-start mb-4">
            <button
              type="button"
              id="backButton"
              onClick={openModal}
              className="underline text-red-500 hover:text-red-600 focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
          </div>
          <h2 className="text-3xl font-normal text-gray-800 mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit}  encType="multipart/form-data">
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="image"
                className="cursor-pointer relative w-36 h-36"
              >
                <img
                  src={selectedImage || input.image}
                  alt="Current Profile Picture"
                  className="w-full h-full rounded-full"
                />
                <button type="button" onClick={uploadImg}>
                  <i
                    className="fas fa-edit text-gray-700 absolute bottom-2 right-2 bg-white rounded-full p-2 cursor-pointer"
                    id="editIcon"
                  ></i>
                </button>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-600 font-normal mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={input.username}
                onChange={(e) => setInput({...input, username: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-600 font-normal mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={(e) => setInput({...input, name: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Name"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                  type="button"
                  id="cancelButton"
                  onClick={openModal}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
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
              Cancel Edit Profile
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Are you sure you want to cancel?
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={cancelCancellation}
                className="px-4 py-2 bg-gray-400 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                No
              </button>
              <button
                onClick={cancelEdit}
                className="mt-2 px-4 py-2 bg-red-400 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
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

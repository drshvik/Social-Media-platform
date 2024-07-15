import { Sidebar } from "../sidebar/Sidebar";
import img1 from "./../../assets/images/1.jpeg";

export function EditProfile() {
  function uploadImg() {
    const image = document.getElementById("profileImage");
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
  return (
    <div>
      <Sidebar />
      <div className="flex-1 ml-80 mr-96 p-6 min-h-screen">
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
          <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
          <form action="#" method="POST" encType="multipart/form-data">
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="profileImage"
                className="cursor-pointer relative w-36 h-36"
              >
                <img
                  src={img1}
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
                  id="profileImage"
                  name="profileImage"
                  className="hidden"
                />
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Name"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
              <button
                type="button"
                id="cancelButton"
                onClick={openModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
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

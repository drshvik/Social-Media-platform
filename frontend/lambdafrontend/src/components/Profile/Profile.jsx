import { Sidebar } from "/src/components/sidebar/Sidebar";

export function Profile() {
  return (
    <div>
      <body className="bg-gray-100">
        <div className="bg-white flex w-full">
          <div className="w-1/5 fixed bg-white h-screen shadow-md p-6 flex flex-col justify-between">
            <Sidebar />
          </div>

          <div className="flex-1 ml-96 mr-96 w-40 p-6">
            <div className="container mx-auto py-10">
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
            </div>
          </div>
        </div>
        <script
          src="https://kit.fontawesome.com/911b160e40.js"
          crossorigin="anonymous"
        ></script>
      </body>
    </div>
  );
}

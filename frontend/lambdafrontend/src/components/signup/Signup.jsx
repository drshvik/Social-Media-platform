import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup() {
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/signup";
    try{
      const response = await axios.post(url, input);
      console.log(response.data);
      Navigate("/login");
    } catch(e) {
      console.log(e);
    }

  };
  return (
    <div className="flex items-center justify-center mt-12 h-180">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl text-gray-800 font-normal mb-10 text-center">Signup</h2>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-normal mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={input.name}
              onChange={handleChange}
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-normal mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={input.username}
              onChange={handleChange}
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-normal mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={input.email}
              onChange={handleChange}
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-normal mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={input.password}
              onChange={handleChange}
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-normal mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 w-40 rounded focus:outline-none focus:shadow-outline"
            >
              Signup
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

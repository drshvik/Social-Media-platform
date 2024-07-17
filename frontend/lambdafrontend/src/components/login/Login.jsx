import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../../tokenUtils";

export function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/login";
    try {
      const response = await axios.post(url, input);

      if (response.data.success) {
        setToken(response.data["token"]);
        navigate("/posts");
      } else {
        setError(true);
        setInput({ ...input, password: "" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className=" flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-normal mb-10 text-center">Login</h2>
        {error ? (
          <p className="text-red-500">
            There was an error Logging In. Please Try Again
          </p>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit} method="POST">
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
          <div className="flex items-center mt-12 justify-between">
            <a
                href="#"
                className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </a>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white w-40 font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>

          </div>
          <div className="mt-6 mb-4 text-center">
            <Link
                to="/signup"
                className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

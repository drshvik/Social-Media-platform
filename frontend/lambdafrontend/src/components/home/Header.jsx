import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-white shadow-md px-4 py-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">SocialApp</h1>
        <div className="flex space-x-4">
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

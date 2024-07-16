import { removeToken } from "../../../tokenUtils";
import { useNavigate } from "react-router-dom";

export function Navlinks() {
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <div>
      <nav className="flex justify-between flex-col">
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              Search
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              Explore
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              My Profile
            </a>
          </li>
        </ul>
        <div>
          <button
            onClick={logout}
            className="text-gray-700 hover:text-blue-500"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

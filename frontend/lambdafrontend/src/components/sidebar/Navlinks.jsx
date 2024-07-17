import { removeToken } from "../../../tokenUtils";
import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faCompass,
  faHouse,
  faMagnifyingGlass,
  faUser
} from "@fortawesome/free-solid-svg-icons";


export function Navlinks() {
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <div>
      <nav className="flex justify-between h-screen flex-col mt-6">
        <ul className="space-y-6">
          <li>
            <Link to="/posts" className="text-slate-500 hover:text-slate-600">
              <FontAwesomeIcon icon={faHouse} />&nbsp;&nbsp;&nbsp; Home
            </Link>
          </li>
          <li>
            <a href="#" className="text-slate-500 hover:text-slate-600">
              <FontAwesomeIcon icon={faMagnifyingGlass} /> &nbsp;&nbsp;&nbsp;Search
            </a>
          </li>
          <li>
            <a href="#" className="text-slate-500 hover:text-slate-600">
              <FontAwesomeIcon icon={faCompass} /> &nbsp;&nbsp;&nbsp;Explore
            </a>
          </li>
          <li>
            <Link to="/myprofile" className="text-slate-500 hover:text-slate-600">
              <FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp;&nbsp; Profile
            </Link>
          </li>
        </ul>
        <div>
          <button
            onClick={logout}
            className="text-slate-500 mb-44 hover:text-slate-600"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />&nbsp;&nbsp;&nbsp; Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

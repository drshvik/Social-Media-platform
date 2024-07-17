// import logo from "../../assets/images/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClapperboard} from "@fortawesome/free-solid-svg-icons";

export function Header() {
  return (
    <div className="flex flex-1 justify-start text-gray-800">
        {/*<img src={logo} className="mb-16"/>*/}
        <FontAwesomeIcon className="mt-3 me-2" icon={faClapperboard} /> <h1 className="text-3xl font-normal mb-6">Memories</h1>
    </div>
  );
}






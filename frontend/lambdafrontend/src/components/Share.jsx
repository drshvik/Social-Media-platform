import { faShare } from "@fortawesome/free-solid-svg-icons";

export function Share() {
  return (
    <div>
      <button className="text-gray-500 hover:text-gray-700">
        <FontAwesomeIcon icon={faShare} />
      </button>
    </div>
  );
}

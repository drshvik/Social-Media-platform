import { Header } from "./Header";
import { Navlinks } from "./Navlinks";

export function Sidebar() {
  return (
    <div className="w-1/5 fixed pl-12 h-screen shadow-md p-10 flex flex-col justify-start border-r-1 border-gray-100 gap-y-1">
      <Header />
      <Navlinks />
    </div>
  );
}

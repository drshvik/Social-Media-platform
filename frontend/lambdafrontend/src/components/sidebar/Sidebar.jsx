import { Header } from "./Header";
import { Navlinks } from "./Navlinks";

export function Sidebar() {
  return (
    <div className="w-1/5 fixed bg-white h-screen shadow-md p-6 flex flex-col justify-start gap-y-1">
      <Header />
      <Navlinks />
    </div>
  );
}

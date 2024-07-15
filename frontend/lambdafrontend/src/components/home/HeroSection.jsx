import img1 from "../../assets/images/1.jpeg";
import img2 from "../../assets/images/2.jpeg";
import img3 from "../../assets/images/3.jpeg";
import img4 from "../../assets/images/4.jpeg";
import img5 from "../../assets/images/5.jpeg";
import img6 from "../../assets/images/6.jpeg";
import img7 from "../../assets/images/7.jpeg";
import img8 from "../../assets/images/8.jpeg";
import img9 from "../../assets/images/9.jpeg";
import img10 from "../../assets/images/10.jpeg";

export function HeroSection() {
  return (
    <main className="bg-white flex flex-col items-center justify-center py-20">
      <div className="container mx-auto flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Share the <span className="text-blue-500">beautiful</span> moments
            in your day
          </h2>
          <div className="grid grid-cols-5 gap-2">
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img1}
              alt="Image 1"
            />
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img2}
              alt="Image 2"
            />
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img3}
              alt="Image 3"
            />
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img4}
              alt="Image 4"
            />
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img5}
              alt="Image 5"
            />
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img6}
              alt="Image 6"
            />
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img7}
              alt="Image 7"
            />
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img8}
              alt="Image 8"
            />
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img9}
              alt="Image 9"
            />
            <img
              className="rounded-lg h-32 w-full object-cover"
              src={img10}
              alt="Image 10"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

import Sidebar from "../../components/Sidebar/Sidebar";
import "./home.css";
import { ReactTyped } from "react-typed";

export default function Home() {
  return (
    <div>
      <div className="flex justify-start z-0 absolute top-0 left-0 h-full w-full pointer-events-none">
        <span className="vertical-line w-80" />
        <span className="vertical-line w-100" />
        <span className="vertical-line w-140" />
        <span className="vertical-line w-100" />
        <span className="vertical-line w-60" />
      </div>

      <Sidebar />
      <div className="flex m-8 sticky z-30 ">
        <h1 className="title-class inline-flex items-center">
          noted
          <ReactTyped
            className="title-class ml-0.5"
            strings={["..."]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </h1>
      </div>
      <div className="box-content-class">
        <h2 className="heading">
          Where handwriting finds its structure, and ideas take shape.
        </h2>
      </div>
    </div>
  );
}

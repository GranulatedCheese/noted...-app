import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./home.css";
import { ReactTyped } from "react-typed";

export default function Home() {
  return (
    <>
      <div className="flex justify-start z-0 absolute top-0 left-0 h-full w-full pointer-events-none">
        <span className="vertical-line w-80" />
        <span className="vertical-line w-100" />
        <span className="vertical-line w-160" />
        <span className="vertical-line w-120" />
        <span className="vertical-line w-40" />
      </div>

      <Sidebar />
      <div className="flex m-10">
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
      <div className="main-box-class z-50">
        <p>Element</p>
      </div>
    </>
  );
}

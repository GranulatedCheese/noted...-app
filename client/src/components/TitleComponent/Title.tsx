import "./title.css";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

export default function Title() {
  return (
    <div className="flex m-8 fixed z-35 ">
      <Link to={"/"}>
        <button className="title-class inline-flex items-center">
          noted
          <ReactTyped
            className="title-class ml-0.5"
            strings={["..."]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </button>
      </Link>
    </div>
  );
}

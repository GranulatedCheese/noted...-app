import "./loading.css";
import { ReactTyped } from "react-typed";

export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-20" />

      <div className="loading-class bg-[#7f9e1a]/90 dark:bg-gray-500">
        <p className="loading-class inline-flex items-center">
          <ReactTyped
            className="title-class"
            strings={["reading...", "writing...", "learning..."]}
            typeSpeed={110}
            backSpeed={70}
            loop
          />
        </p>
      </div>
    </>
  );
}

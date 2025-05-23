import "./lander.css";

export default function Lander() {
  return (
    <div>
      <div className="flex justify-start z-0 absolute top-0 left-0 h-full w-full pointer-events-none">
        <span className="vertical-line w-80" />
        <span className="vertical-line w-100" />
        <span className="vertical-line w-140" />
        <span className="vertical-line w-100" />
        <span className="vertical-line w-60" />
      </div>

      <div className="box-content-class">
        <h2 className="heading">
          Where handwriting finds its structure, and ideas take shape.
        </h2>
      </div>
    </div>
  );
}

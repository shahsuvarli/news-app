import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full h-14 bg-slate-600 text-slate-100 p-2">
      <Link to={"/"}>NGT - Neutral Global Timely</Link>
    </div>
  );
};

export default Banner;

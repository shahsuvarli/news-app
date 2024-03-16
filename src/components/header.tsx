import { Link, useLocation } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className="text-slate-700 w-full h-20 bg-slate-200 p-2 flex flex-row gap-4 items-center justify-between px-8">
      <span className="flex flex-row gap-10 text-slate-800 items-center">
        <span className="flex flex-row gap-6 items-center">
          <FaRegNewspaper size={34} />
          <Link to={"/"}>
            <p className="text-xl font-medium">Daily News</p>
          </Link>
        </span>
      </span>
      <span className="flex flex-row gap-6 text-xl text-slate-600">
        <Link to={"/"} id="search" className={``}>
          Home
        </Link>
        <Link to={"/search"} id="search">
          Search
        </Link>
      </span>
      <span className="flex flex-row gap-4 items-center">
        <img
          src="https://avatars.githubusercontent.com/u/46631807?v=4"
          alt="photo"
          width={54}
          className="rounded-full border-2 border-solid border-slate-700"
        />
        <p className="text-xl">Elvin Shahsuvarli</p>
      </span>
    </div>
  );
};

export default Header;

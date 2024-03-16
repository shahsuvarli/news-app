import { useState } from "react";
import NewsBoard from "../components/newsBoard";
import SearchNewsFilter from "../components/searchNewsFilter";
import { IoFilter } from "react-icons/io5";

export default function SearchNews() {
  const [result, setResult] = useState<any>([]);
  const [showFilter, setShowFilter] = useState<any>(true);
  const date = new Date().toLocaleDateString();

  return (
    <>
      <div className="flex flex-row justify-between mb-4 gap-2">
        <p className="border-2 border-slate-800 border-solid rounded-md px-4 py-2 flex flex-row justify-center items-center">
          {date}
        </p>
        <button
          className="bg-slate-800 rounded-md py-2 px-4 flex flex-row gap-2 text-slate-100 hover:bg-slate-700 duration-100"
          onClick={() => setShowFilter(!showFilter)}
        >
          <p className="sm:block hidden">
            {showFilter ? "hide" : "show"} filters
          </p>
          <IoFilter size={24} />
        </button>
      </div>
      <SearchNewsFilter setResult={setResult} showFilter={showFilter} />
      <NewsBoard result={result} title={"Search Results"} />
    </>
  );
}

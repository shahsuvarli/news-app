import { useState } from "react";
import NewsBoard from "../components/newsBoard";
import NewsFeedFilter from "../components/newsFeedFilter";
import { IoFilter } from "react-icons/io5";

export default function NewsFeed() {
  const [bannerArticle, setBannerArticle] = useState<any>({});
  const [result, setResult] = useState<any>([]);
  const [showFilter, setShowFilter] = useState<any>(false);
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
      <NewsFeedFilter
        setResult={setResult}
        setBannerArticle={setBannerArticle}
        showFilter={showFilter}
      />
      <div className="flex flex-row bg-slate-800">
        <div className="relative w-full bg-slate-700 h-100">
          <img
            src={bannerArticle?.image || 'https://images.unsplash.com/photo-1622463461333-611830d028bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            alt="banner-image"
            className="w-full bg-slate-400 h-96 object-cover"
          />
          <span className="sm:absolute relative w-full bg-slate-500 sm:w-1/3 right-0 bottom-0 sm:h-full h-auto p-4 flex flex-col justify-between opacity-90">
            <p className="bottom-0 text-slate-100 right-0 sm:text-xl text-sm">
              {bannerArticle?.title || "Dear user, please customize your news feed first"}
            </p>
          </span>
        </div>
      </div>

      <NewsBoard result={result} title={"News Feed"} />
    </>
  );
}

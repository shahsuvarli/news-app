import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import useFilters from "../hooks/useFilters";
import Select from "react-select";
import ReactSelect from "react-select";
import useNewsFeed from "../hooks/useNewsFeed";
import NewsBoard from "../components/newsBoard";

type Inputs = {
  category: any;
  source: any;
};

export default function NewsFeed() {
  const [bannerArticle, setBannerArticle] = useState<any>({});
  const [categories, setCategories] = useState<any>([]);
  const [sources, setSources] = useState<any>([]);
  const [result, setResult] = useState<any>([]);
  const { handleSubmit, control, setValue } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.category) {
      localStorage.setItem("category", JSON.stringify(data.category));
    }
    if (data.source) {
      localStorage.setItem("source", JSON.stringify(data.source));
    }
    const results = await useNewsFeed(data.category, data.source);
    setResult(results);
  };

  useEffect(() => {
    // we get the unique categories and the sources from the /source endpoint to assign to the droplist selection options
    const fetchData = async () => {
      const { uniqueCategories, uniqueURLs } = await useFilters();
      setCategories(uniqueCategories);
      setSources(uniqueURLs);
    };

    fetchData();

    // here we check whether the user has predefined categories and sources in localstorage
    const categories = localStorage.getItem("category");
    const source = localStorage.getItem("source");
    if (categories) {
      setValue("category", JSON.parse(categories));
    }
    if (source) {
      setValue("source", JSON.parse(source));
    }

    const getNews = async () => {
      const articles = await useNewsFeed(categories, source);
      setBannerArticle(articles[0]);
      setResult(articles);
    };
    getNews();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full mb-6"
      >
        <div className="[&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-2 [&>div>input]:border-slate-400 [&>div>div>input]:border-2 [&>div>div>input]:border-solid [&>div>div>input]:rounded-md [&>div>div>input]:px-4 [&>div>div>input]:outline-slate-500 [&>div>div>input]:py-2 flex flex-col gap-4">
          <div className="bg-slate-300 p-4 rounded-md [&>div]:mb-4 text-slate-500">
            <p className="text-center font-normal text-xl">
              Customize News Feed
            </p>
            <div>
              <label htmlFor="category">Category</label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <ReactSelect
                    isMulti
                    options={categories}
                    closeMenuOnSelect={false}
                    {...field}
                    id="category"
                  />
                )}
              />
            </div>

            <div>
              <label htmlFor="source">Source</label>
              <Controller
                control={control}
                name="source"
                render={({ field }) => (
                  <Select
                    isMulti
                    options={sources}
                    closeMenuOnSelect={false}
                    {...field}
                    id="source"
                    className={
                      "[&>div>div]:flex [&>div>div]:flex-row [&>div>div]:overflow-x-auto [&>div>div]:flex-nowrap [&>div>div>div]:min-w-20"
                    }
                  />
                )}
              />
            </div>
            <div className="flex flex-row items-end">
              <input
                type="submit"
                className="bg-slate-500 rounded-md p-2 w-20 text-slate-100 hover:cursor-pointer hover:bg-slate-700 duration-200"
                value={"Save"}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-row bg-slate-800">
        <div className="relative w-full bg-slate-700 h-100">
          <img
            src={bannerArticle?.image}
            alt="banner-image w-full bg-slate-400 h-40 object-cover"
          />
          <span className="absolute bg-slate-500 z-10 w-1/3 right-0 bottom-0 h-full p-4 flex flex-col justify-between opacity-90">
            <p className="bottom-0 text-slate-100 right-0">
              {bannerArticle?.title}
            </p>
          </span>
        </div>
      </div>

      <NewsBoard result={result} title={"News Feed"} />
    </>
  );
}

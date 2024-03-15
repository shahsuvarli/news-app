import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import useFilters from "../hooks/useFilters";
import Select from "react-select";
import ReactSelect from "react-select";
import useNewsFeed from "../hooks/useNewsFeed";
import { Await, Link } from "react-router-dom";

type Inputs = {
  category: any;
  source: any;
};

export default function Home() {
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
      setResult(articles);
    };
    getNews();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-6"
      >
        <div className="[&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-2 [&>div>input]:border-slate-400 [&>div>div>input]:border-2 [&>div>div>input]:border-solid [&>div>div>input]:rounded-md [&>div>div>input]:px-4 [&>div>div>input]:outline-slate-500 [&>div>div>input]:py-2 flex flex-col gap-4">
          <div className="bg-slate-300 p-4 rounded-md [&>div]:mb-4">
            <p className="text-center font-normal text-xl">Filter</p>
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
                  />
                )}
              />
            </div>
          </div>
        </div>

        <input
          type="submit"
          className="bg-slate-500 rounded-md p-2 w-20 text-slate-100 hover:cursor-pointer"
          value={"Save"}
        />
      </form>
      <div className="mt-8 border-2 border-solid border-slate-300 rounded-md p-2 ">
        <p className="text-center my-5 font-normal text-xl text-slate-100 bg-slate-400 rounded-md">
          Results
        </p>
        <Select isMulti options={sources} closeMenuOnSelect={false} />

        <div className="grid grid-flow-row grid-cols-4 gap-x-4 gap-y-6 flex-wrap">
          {result?.map((item: any) => (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg"
              key={item.id}
            >
              <a href={item.url} target="_blank">
                <img
                  className="w-full object-contain h-60"
                  src={item.image || item.altImage}
                  alt={item.title}
                />
              </a>
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base">{item.title}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {item.source}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

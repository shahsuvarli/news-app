import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useNewsFeed from "../hooks/useNewsFeed";
import { useEffect, useState } from "react";
import useFilters from "../hooks/useFilters";
import Select from "react-select";
import { Inputs, NewsFeedPropsTypes } from "../constants/types";

function NewsFeedFilter({
  setResult,
  setBannerArticle,
  showFilter,
}: NewsFeedPropsTypes) {
  const { handleSubmit, control, setValue } = useForm<Inputs>();

  const [categories, setCategories] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async ({ category, source }) => {
    if (category) {
      localStorage.setItem("category", JSON.stringify(category));
    }
    if (source) {
      localStorage.setItem("source", JSON.stringify(source));
    }

    getNews(JSON.stringify(category), JSON.stringify(source));
  };

  const getNews = async (categories: string | null, source: string | null) => {
    try {
      const articles = await useNewsFeed(categories, source);
      setBannerArticle(articles[0]);
      setResult(articles);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      const { uniqueCategories, uniqueURLs } = await useFilters();
      setCategories(uniqueCategories);
      setSources(uniqueURLs);
    };

    fetchData();

    try {
      const categories = localStorage.getItem("category");
      const source = localStorage.getItem("source");
      if (categories) {
        setValue("category", JSON.parse(categories));
      }
      if (source) {
        setValue("source", JSON.parse(source));
      }

      getNews(categories, source);
    } catch (error) {}
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-6 w-full mb-6 ${
        showFilter ? "block" : "hidden"
      }`}
    >
      <div className="[&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-2 [&>div>input]:border-slate-400 [&>div>div>input]:border-2 [&>div>div>input]:border-solid [&>div>div>input]:rounded-md [&>div>div>input]:px-4 [&>div>div>input]:outline-slate-500 [&>div>div>input]:py-2 flex flex-col gap-4">
        <div className="bg-slate-300 p-4 rounded-md [&>div]:mb-4 text-slate-500">
          <p className="text-center font-normal text-xl mb-4">
            Customize News Feed
          </p>
          <div>
            <label htmlFor="category">Category</label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
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
  );
}

export default NewsFeedFilter;

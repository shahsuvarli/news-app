import { SubmitHandler, useForm } from "react-hook-form";
import useAPI from "../hooks/useAPI";
import sources from "../assets/sources.json";
import { NewsFeedInputs } from "../constants/types";

const categories = [
  { id: 0, name: "Sport" },
  { id: 1, name: "Politics" },
  { id: 2, name: "Finance" },
  { id: 3, name: "Science" },
  { id: 4, name: "Entertainment" },
];

interface SearchNewsFiless {
  setResult: (arg0: any) => void;
  showFilter: boolean;
}

function SearchNewsFilter({ setResult, showFilter }: SearchNewsFiless) {
  const { register, handleSubmit } = useForm<NewsFeedInputs>();

  const onSubmit: SubmitHandler<NewsFeedInputs> = async (
    data: NewsFeedInputs
  ) => {
    const results = await useAPI(data);
    setResult(results);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-6 ${showFilter ? "block" : "hidden"}`}
    >
      <div className="[&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-2 [&>div>input]:border-slate-400 [&>div>div>input]:border-2 [&>div>div>input]:border-solid [&>div>div>input]:rounded-md [&>div>div>input]:px-4 [&>div>div>input]:outline-slate-500 [&>div>div>input]:py-2 flex flex-col gap-4">
        <div className="bg-slate-300 p-4 rounded-md">
          <p className="text-center font-normal text-xl">Search</p>
          <div>
            <label htmlFor="keyword">Keyword</label>
            <input id="keyword" {...register("keyword")} />
          </div>
        </div>

        <div className="bg-slate-300 p-4 rounded-md [&>div]:mb-4">
          <p className="text-center font-normal text-xl">Filter</p>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" {...register("date")} />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              className={`mt-1 p-2 border rounded w-full text-gray-700 placeholder:text-sm placeholder:italic outline-none`}
              {...register("category")}
              id="category"
              defaultValue=""
            >
              <option value="">Select category</option>
              {categories.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="source">Source</label>
            <select
              className={`mt-1 p-2 border rounded w-full text-gray-700 placeholder:text-sm placeholder:italic outline-none`}
              {...register("source")}
              defaultValue=""
              id="source"
            >
              <option value="">Select source</option>
              {sources.map(({ id, name, link }) => (
                <option key={id} value={link}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-end">
            <input
              type="submit"
              className="bg-slate-500 rounded-md p-2 w-20 text-slate-100 hover:cursor-pointer hover:bg-slate-700 duration-200"
              value={"Search"}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchNewsFilter;

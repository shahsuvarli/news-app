import { useForm, SubmitHandler } from "react-hook-form";
import sources from "../assets/sources.json";
import { useState } from "react";
import useAPI from "../hooks/useAPI";

type Inputs = {
  keyword: string;
  date: Date;
  category: string;
  source: string;
};

const categories = [
  { id: 0, name: "Sport" },
  { id: 1, name: "Politics" },
  { id: 2, name: "Finance" },
  { id: 3, name: "Science" },
  { id: 4, name: "Entertainment" },
];

export default function SearchForm() {
  const [result, setResult] = useState<any>([]);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const results = await useAPI(data);
    setResult(results);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-6"
      >
        <div className="[&>div>div]:flex [&>div>div]:flex-col [&>div>div]:gap-2 [&>div>input]:border-slate-400 [&>div>div>input]:border-2 [&>div>div>input]:border-solid [&>div>div>input]:rounded-md [&>div>div>input]:px-4 [&>div>div>input]:outline-slate-500 [&>div>div>input]:py-2 flex flex-col gap-4">
          <div className="bg-slate-300 p-4 rounded-md">
            <p className="text-center font-normal text-xl">Search</p>
            <div>
              <label htmlFor="keyword">Keyword</label>
              <input
                defaultValue="test"
                id="keyword"
                {...register("keyword")}
              />
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
                {categories.map(({ id, name }: any) => (
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
                {...register("category")}
                defaultValue=""
                id="source"
              >
                <option value="">Select source</option>
                {sources.map(({ id, name, link }: any) => (
                  <option key={id} value={link}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <input
          type="submit"
          className="bg-slate-500 rounded-md p-2 w-20 text-slate-100 hover:cursor-pointer"
        />
      </form>
      <div className="mt-8 border-2 border-solid border-slate-300 rounded-md p-2 ">
        <p className="text-center my-5 font-normal text-xl text-slate-100 bg-slate-400 rounded-md">
          Results
        </p>
        <div className="grid grid-flow-row grid-cols-4 gap-x-4 gap-y-6 flex-wrap">
          {result?.map((item: any) => (
            // <div
            //   key={item.id}
            //   className="min-h-60 w-64 rounded-md drop-shadow-md relative bg-slate-300 p-2 flex justify-between fle-col"
            // >
            //   <Link to={item.url} target="_blank">
            //     <p className="text-base text-slate-500">{item.title}</p>
            //     <div className="relative">
            //       <img
            //         src={item.image}
            //         className="object-cover w-40 aspect-video bottom-0 rounded-md"
            //         onError={(e) =>
            //           (e.currentTarget.src = item.altImage)
            //         }
            //       />
            //       <p className="absolute bg-slate-700 text-slate-100 border-2 border-slate-100 border-solid rounded-full bottom-1 right-1 px-2 py-1 text-xs">
            //         {item.date}
            //       </p>
            //       <p className="absolute left-1 bottom-1 bg-slate-700 text-slate-100 border-2 border-slate-100 border-solid rounded-full px-2 text-xs py-1">
            //         {item.source}
            //       </p>
            //     </div>
            //   </Link>
            // </div>
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
                {/* <div className="font-bold text-xl mb-2">{item.source}</div> */}
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

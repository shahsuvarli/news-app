import NewsCard from "./newsCard";

function NewsBoard({result, title}:any) {
  return (
    <div className="mt-8 border-2 border-solid border-slate-300 rounded-md p-2 ">
      <p className="text-center my-5 font-normal text-slate-700 bg-slate-200 rounded-md h-20 flex flex-col justify-center text-2xl">
        {title}
      </p>

      <div className="grid grid-flow-row grid-cols-4 gap-x-4 gap-y-6 flex-wrap">
        {result?.map((item: any) => (
          <NewsCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default NewsBoard;

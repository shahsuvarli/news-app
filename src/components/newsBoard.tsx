import { NewsCardType } from "../constants/types";
import NewsCard from "./newsCard";

interface NewsBoardType {
  result: NewsCardType[];
  title: string;
}

function NewsBoard({ result, title }: NewsBoardType) {
  return (
    <div className="mt-8 border-2 border-solid border-slate-300 rounded-md p-2 ">
      <p className="text-center my-5 font-normal text-slate-700 bg-slate-200 rounded-md h-20 flex flex-col justify-center text-2xl">
        {title}
      </p>

      <div className="grid grid-flow-row xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-6 flex-wrap justify-items-stretch justify-center">
        {result?.map((item: NewsCardType) => (
          <NewsCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default NewsBoard;

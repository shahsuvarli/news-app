import { useEffect, useState } from "react";

const NewsApi = () => {
  const [news, setNews] = useState<any>([]);
  console.log(news);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?qInTitle='azerbaijan'&from=2024-02-11&sortBy=publishedAt&apiKey=5b17401668b04eae906aa1bd6a179966"
    )
      .then((res) => res.json())
      .then((res) => setNews(res.articles));
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {news?.map((item: any) => (
        <div className="w-50 h-50 border-slate-500 border-solid border-2 rounded-md p-2 text-wrap truncate">
          <p>{item.author}</p>
          <p>{item.title}</p>
          <img src={item.urlToImage} width={200} height={200} />
        </div>
      ))}
    </div>
  );
};

export default NewsApi;

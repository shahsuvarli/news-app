export default async function useNewsFeed(data: any, value: any) {
  // cleaning of array of categories
  const arrayOfCategories: any = [];
  JSON.parse(data)?.map((item: any) => {
    arrayOfCategories.push(item.value);
  });
  const stringOfCategories = arrayOfCategories.join(" OR ");

  // cleaning of array of sources
  const arrayOfSources: any = [];
  JSON.parse(value)?.map((item: any) => {
    arrayOfSources.push(item.value);
  });
  const stringOfSources = arrayOfSources.join(",");

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${stringOfCategories}&domains=${stringOfSources}&language=en&sortBy=publishedAt&apiKey=1d59d6783d3a4f9ca5fc0fc9eaf52cc0`
  );

  const response = await res.json();

  const final_result = response.articles.map((obj: any, index: number) => {
    return {
      id: index,
      date: obj.publishedAt.split("T")[0],
      title: obj.title,
      url: obj.url,
      image: obj.urlToImage,
      source: obj.source.name,
      altImage: "newsapi.png",
    };
  });

  return final_result;
}

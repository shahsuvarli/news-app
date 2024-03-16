export default async function useNewsFeed(categories: any, sources: any) {
  // cleaning of array of categories
  const arrayOfCategories: string[] = [];
  JSON.parse(categories)?.map(({ value }: { value: string }) => {
    arrayOfCategories.push(value);
  });
  const stringOfCategories = arrayOfCategories.join(" OR ");

  // cleaning of array of sources
  const arrayOfSources: string[] = [];
  JSON.parse(sources)?.map(({ value }: { value: string }) => {
    arrayOfSources.push(value);
  });
  const stringOfSources = arrayOfSources.join(",");

  const domainQuery = stringOfSources ? `&domains=${stringOfSources}` : "";

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${
      stringOfCategories || "news"
    }${domainQuery}&language=en&sortBy=publishedAt&apiKey=5b17401668b04eae906aa1bd6a179966`
  );

  const response = await res.json();

  const final_result = response.articles?.map((obj: any, index: number) => {
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

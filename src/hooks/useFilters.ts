export default async function useFilters() {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines/sources?&apiKey=1d59d6783d3a4f9ca5fc0fc9eaf52cc0"
  );

  const response = await res.json();
  const categories: any = [];
  const urls: any = [];

  response.sources.map((item: any) => {
    categories.push({
      value: item.category,
      label: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    });
    urls.push({
      value: item.url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0],
      label: item.name,
    });
  });

  const uniqueCategories = Array.from(
    new Map(categories.map((obj: any) => [obj.value, obj])).values()
  );
  const uniqueURLs = Array.from(
    new Map(urls.map((obj: any) => [obj.value, obj])).values()
  );

  return { uniqueCategories, uniqueURLs };
}

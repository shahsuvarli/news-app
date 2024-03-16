export default async function useAPI(data: any) {
  console.log(data);
  if (data.source === "newsapi" || !data.source) {
    const query = data.keyword + (data.category ? ` AND ${data.category}` : "");
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=(${query})&from=${data.date}&language=en&sortBy=publishedAt&apiKey=1d59d6783d3a4f9ca5fc0fc9eaf52cc0`
    );
    console.log(res.url);
    const result = await res.json();
    console.log(result);
    const final_result = result.articles.map((obj: any, index: number) => {
      return {
        id: index,
        date: obj.publishedAt.split("T")[0],
        title: obj.title,
        url: obj.url,
        image: obj.urlToImage,
        source: "NewsAPI.org",
        altImage: "newsapi.png",
      };
    });
    console.log(final_result);
    return final_result;
  } else if (data.source === "nytimes") {
    const parsedDate = data.date?.replaceAll("-", "");
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${
        data.keyword + " " + data.category
      }&begin_date=${
        parsedDate || "20220101"
      }&api-key=6smfx8F6IhtgLQ2MMAL2dN1Sbpo0SbHm`
    );

    const response = await res.json();
    const final_result = response.response?.docs.map(
      (obj: any, index: number) => ({
        id: index,
        date: obj.pub_date?.split("T")[0],
        title: obj.headline?.main,
        url: obj.web_url,
        image: obj.multimedia?.[0]?.url
          ? "https://static01.nyt.com/" + obj.multimedia?.[0]?.url
          : null,
        source: "NYTimes",
        altImage: "/nyt.png",
      })
    );
    return final_result;
  } else if (data.source === "guardian") {
    const section = data.category
      ? `&section=${data.category.toLowerCase()}`
      : "";
    const res = await fetch(
      `https://content.guardianapis.com/search?q=${data.keyword}&from-date=${
        data.date || "2022-01-01"
      }${section}&show-fields=thumbnail&api-key=2e0e9f73-d7a7-42a3-b25a-c2f8418d7048`
    );
    console.log(res.url);
    const response = await res.json();
    const final_result = response.response.results.map(
      (obj: any, index: number) => {
        return {
          id: index,
          date: obj.webPublicationDate.split("T")[0],
          title: obj.webTitle,
          url: obj.webUrl,
          image: obj.fields.thumbnail,
          source: "The Guardian",
          altImage: "/guardian.png",
        };
      }
    );

    return final_result;
  }
}

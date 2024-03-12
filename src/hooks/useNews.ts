export default function useNews() {
  fetch(
    "https://newsapi.org/v2/everything?q=tesla&from=2024-02-11&sortBy=publishedAt&apiKey=5b17401668b04eae906aa1bd6a179966"
  )
    .then((res) => res.json())
    .then((res) => {
      return res.articles;
    });
}

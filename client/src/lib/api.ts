export async function getArticles() {
  const res = await fetch("/data/articles/index.json");
  return res.json();
}

export async function getArticle(id: string) {
  const res = await fetch(`/data/articles/${id}.json`);
  return res.json();
}
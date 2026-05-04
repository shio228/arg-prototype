export async function getArticles() {
  const res = await fetch("/data/articles/index.json");
  return res.json();
}

export async function getArticle(id: string) {
  const res = await fetch(`/data/articles/${id}.json`);
  return res.json();
}

export async function getRecentArticles(limit = 5) {
  const articles = await getArticles();
  return articles
    .filter((a: any) => a.status === "published")
    .sort((a: any, b: any) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export async function getDraftArticles() {
  const articles = await getArticles();
  return articles
    .filter((a: any) => a.status === "draft")
    .sort((a: any, b: any) => b.date.localeCompare(a.date));
}
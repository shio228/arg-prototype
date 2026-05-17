export async function getArticles() {
  const res = await fetch("/data/index.json");
  return res.json();
}

export async function getArticle(id: string) {
  const res = await fetch(`/data/articles/${id}.json`);
  const article = await res.json();
  if (article.contentFile) {
    const mdRes = await fetch(article.contentFile);
    article.content = await mdRes.text();
  }
  return article;
}

export async function getRecentArticles(authorId: string) {
  const articles = await getArticles();
  return articles
    .filter((a: any) => a.status === "published" && a.authorId === authorId)
    .sort((a: any, b: any) => b.date.localeCompare(a.date));
}

export async function getDraftArticles(authorId: string) {
  const articles = await getArticles();
  return articles
    .filter((a: any) => a.status === "draft" && a.authorId === authorId)
    .sort((a: any, b: any) => b.date.localeCompare(a.date));
}
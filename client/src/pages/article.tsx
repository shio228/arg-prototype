import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import { getArticle } from "../lib/api";

export default function Article() {
  const [, params] = useRoute("/article/:id");
  const { id } = params;

  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    getArticle(id).then(setArticle);
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img
        src={article.thumbnail}
        className="w-full h-48 object-cover mb-4"
      />

      <h1 className="text-2xl font-bold">{article.title}</h1>
      <p className="text-sm text-gray-500">{article.date}</p>

      <div className="mt-4 whitespace-pre-line">
        {article.content}
      </div>
    </div>
  );
}
import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import { getArticle, getRecentArticles, getDraftArticles } from "../lib/api";

const SESSION_KEY = 'loggedInAuthorId';
const SESSION_DATE_KEY = 'registeredDate';

const displayDate = (date: string) =>
  date || sessionStorage.getItem(SESSION_DATE_KEY) || '';

export default function Article() {
  const [, params] = useRoute("/article/:id");
  const { id } = params!;

  const [article, setArticle] = useState<any>(null);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [draftArticles, setDraftArticles] = useState<any[]>([]);
  const [loggedInAuthorId, setLoggedInAuthorId] = useState<string | null>(sessionStorage.getItem(SESSION_KEY));

  useEffect(() => {
    const handler = () => setLoggedInAuthorId(sessionStorage.getItem(SESSION_KEY));
    window.addEventListener('auth-changed', handler);
    return () => window.removeEventListener('auth-changed', handler);
  }, []);

  useEffect(() => {
    getArticle(id).then((articleData) => {
      setArticle(articleData);
      getRecentArticles(articleData.authorId).then(setRecentArticles);
      const loggedIn = sessionStorage.getItem(SESSION_KEY);
      if (loggedIn === articleData.authorId) {
        getDraftArticles(loggedIn!).then(setDraftArticles);
      } else {
        setDraftArticles([]);
      }
    });
  }, [id]);

  const [imageOpen, setImageOpen] = useState(false);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          className="w-full h-48 object-cover mb-4 cursor-pointer"
          onClick={() => setImageOpen(true)}
        />
      )}

      {imageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setImageOpen(false)}
        >
          <img
            src={article.thumbnail}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="flex gap-8">
        {/* 左：記事本文 */}
        <main className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold">{article.title}</h1>
          <p className="text-sm text-gray-500">{displayDate(article.date)}</p>

          <div className="mt-4 whitespace-pre-line text-lg">
            {article.content}
          </div>
        </main>
        {/* 右：サイドバー */}
        <aside className="w-56 shrink-0">
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 border-red-500 pb-1 mb-2">
              最新記事
            </h2>
            {recentArticles.filter((a) => a.date && (loggedInAuthorId === article.authorId || !a.hidden)).map((a) => (
              <div key={a.id} className="flex justify-between items-baseline py-1 text-base">
                <a href={`/article/${a.id}`} className="truncate mr-2 hover:underline">
                  {a.title}
                </a>
                <span className="text-xs text-gray-400 shrink-0">{displayDate(a.date)}</span>
              </div>
            ))}
          </section>

          {/* 下書き（ログイン時のみ） */}
          {loggedInAuthorId === article.authorId && (
            <section>
              <h2 className="text-lg font-bold border-b-2 border-red-500 pb-1 mb-2">
                下書き
              </h2>
              {draftArticles.map((a) => (
                <div key={a.id} className="flex justify-between items-baseline py-1 text-base">
                  <a href={`/article/${a.id}`} className="truncate mr-2 hover:underline">
                    {a.title}
                  </a>
                  <span className="text-xs text-gray-400 shrink-0">{displayDate(a.date)}</span>
                </div>
              ))}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
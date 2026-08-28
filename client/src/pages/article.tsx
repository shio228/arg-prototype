import { useRoute, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { getArticle, getRecentArticles, getDraftArticles } from "../lib/api";
import ReactMarkdown from "react-markdown";
import ShareToX from "../components/ShareToX";
import { trackEvent } from "../lib/analytics";

const SESSION_KEY = 'loggedInAuthorId';
const SESSION_DATE_KEY = 'registeredDate';

// 合言葉登録済みユーザーのみ閲覧できる記事ID
const RESTRICTED_IDS = ['25', '26'];

const displayDate = (date: string) =>
  date || sessionStorage.getItem(SESSION_DATE_KEY) || '';

export default function Article() {
  const [, params] = useRoute("/article/:id");
  const { id } = params!;

  const [article, setArticle] = useState<any>(null);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [draftArticles, setDraftArticles] = useState<any[]>([]);
  const [loggedInAuthorId, setLoggedInAuthorId] = useState<string | null>(sessionStorage.getItem(SESSION_KEY));
  const [prevHidden, setPrevHidden] = useState(() => sessionStorage.getItem('lastArticleHidden') === 'true');
  const [, navigate] = useLocation();

  // 制限記事は合言葉登録済みユーザー以外404へ
  const blocked = RESTRICTED_IDS.includes(id) && loggedInAuthorId !== 'OUROBOROS0000';

  useEffect(() => {
    if (blocked) navigate('/404', { replace: true });
  }, [blocked, navigate]);

  useEffect(() => {
    const handler = () => setLoggedInAuthorId(sessionStorage.getItem(SESSION_KEY));
    window.addEventListener('auth-changed', handler);
    return () => window.removeEventListener('auth-changed', handler);
  }, []);

  useEffect(() => {
    if (blocked) return;
    getArticle(id).then((articleData) => {
      setPrevHidden(!!articleData.hidden);
      sessionStorage.setItem('lastArticleHidden', String(!!articleData.hidden));
      setArticle(articleData);
      getRecentArticles(articleData.authorId).then(setRecentArticles);
      const loggedIn = sessionStorage.getItem(SESSION_KEY);
      if (loggedIn === articleData.authorId) {
        getDraftArticles(loggedIn!).then(setDraftArticles);
      } else {
        setDraftArticles([]);
      }
    });
  }, [id, blocked]);

  const [imageOpen, setImageOpen] = useState(false);

  useEffect(() => {
    if (!article) return;
    if (article.hidden) document.body.classList.add('hidden-article');
    return () => document.body.classList.remove('hidden-article');
  }, [article]);

  if (!article) return (
    <div className="min-h-screen" style={{ background: prevHidden
      ? 'radial-gradient(110% 80% at 50% 45%, oklch(0.88 0.01 60) 0%, oklch(0.94 0.01 60) 70%, oklch(0.98 0 0) 100%)'
      : 'radial-gradient(110% 80% at 50% 45%, oklch(0.18 0.01 60) 0%, oklch(0.10 0.01 60) 70%, oklch(0.04 0 0) 100%)'
    }} />
  );

  const isHidden = !!article.hidden;
  const pageStyle = (isHidden ? {
    background: 'radial-gradient(110% 80% at 50% 45%, oklch(0.88 0.01 60) 0%, oklch(0.94 0.01 60) 70%, oklch(0.98 0 0) 100%)',
    '--foreground': 'oklch(0.12 0.02 80)',
    '--muted-foreground': 'oklch(0.38 0.02 80)',
    '--border': 'rgba(55,35,0,0.2)',
    '--background': 'oklch(0.92 0.01 60)',
  } : {
    background: 'radial-gradient(110% 80% at 50% 45%, oklch(0.18 0.01 60) 0%, oklch(0.10 0.01 60) 70%, oklch(0.04 0 0) 100%)',
    '--foreground': 'oklch(0.94 0.02 80)',
    '--muted-foreground': 'oklch(0.65 0.02 80)',
    '--border': 'rgba(255,235,200,0.15)',
    '--background': 'oklch(0.12 0.01 60)',
  }) as React.CSSProperties;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={pageStyle}
    >
      <div className="home-grain" style={{ zIndex: 0 }} />
      <div className="home-vignette" style={{ zIndex: 1 }} />
    <div className="max-w-5xl mx-auto p-4 relative" style={{ zIndex: 2 }}>
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
          <h1 className="text-4xl font-bold text-muted-foreground">{article.title}</h1>
          <p className="text-sm text-muted-foreground">{displayDate(article.date)}</p>

          <div className={`mt-4 text-lg prose max-w-none ${isHidden ? '' : 'prose-invert'}`}>
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </main>
        {/* 右：サイドバー */}
        <aside className="w-56 shrink-0">
          <section className="mb-6">
            <h2 className="text-lg font-bold border-b-2 border-red-500 pb-1 mb-2 text-muted-foreground">
              最新記事
            </h2>
            {recentArticles.filter((a) => a.date && (loggedInAuthorId === article.authorId || !a.hidden)).map((a) => (
              <div key={a.id} className="flex justify-between items-baseline py-1 text-base text-muted-foreground">
                <a href={`/article/${a.id}`} className="truncate mr-2 hover:underline">
                  {a.title}
                </a>
                <span className="text-xs text-muted-foreground shrink-0">{displayDate(a.date)}</span>
              </div>
            ))}
          </section>

          {/* 下書き（ログイン時のみ） */}
          {loggedInAuthorId === article.authorId && (
            <section>
              <h2 className="text-lg font-bold border-b-2 border-red-500 pb-1 mb-2 text-muted-foreground">
                下書き
              </h2>
              {draftArticles.map((a) => (
                <div key={a.id} className="flex justify-between items-baseline py-1 text-base text-muted-foreground">
                  <a href={`/article/${a.id}`} className="truncate mr-2 hover:underline">
                    {a.title}
                  </a>
                  <span className="text-xs text-muted-foreground shrink-0">{displayDate(a.date)}</span>
                </div>
              ))}
            </section>
          )}

          {/* Xへの共有（合言葉で登録したユーザーのみ） */}
          {loggedInAuthorId === 'OUROBOROS0000' && (
            <section className="mt-6 space-y-3">
              <ShareToX />
              <a
                href="https://sim3.net/portal/clear/#bdd8a87dd3324413888e29eae0977699"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('sim3-clear')}
                className="inline-block px-6 py-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
              >
                クリア実績を登録する
              </a>
            </section>
          )}
        </aside>
      </div>
    </div>
    </div>
  );
}
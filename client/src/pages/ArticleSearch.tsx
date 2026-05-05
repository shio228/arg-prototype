import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import { getArticles } from '@/lib/api';

export default function ArticleSearch() {
  const [displayArticles, setDisplayArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const published = (articles: any[]) => articles.filter((a) => a.status === 'published');

  useEffect(() => {
    getArticles().then((data) => setDisplayArticles(published(data)));
  }, []);

  const handleSearch = (query: string, matched: any[]) => {
    setSearchQuery(query);
    setDisplayArticles(published(matched));
    setSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <div className="max-w-md mx-auto">
            <SearchForm onSearch={handleSearch} />

            <div className="mt-6">
              {searched && displayArticles.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  「{searchQuery}」に一致する記事は見つかりませんでした。
                </p>
              ) : (
                <ul className="space-y-3">
                  {displayArticles.map((a) => (
                    <li key={a.id} className="border-b border-border pb-3">
                      <a
                        href={`/article/${a.id}`}
                        className="text-base font-medium hover:underline"
                      >
                        {a.title}
                      </a>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {a.date}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

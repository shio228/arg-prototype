import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { getArticles } from '@/lib/api';

type Tab = 'list' | 'ranking' | 'recommended';

export default function ArticleSearch() {
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [allPublished, setAllPublished] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('list');

  useEffect(() => {
    getArticles().then((data) => {
      setAllArticles(data);
      const pub = data.filter((a: any) => a.status === 'published' && !a.hidden);
      setAllPublished(pub);
    });
  }, []);

  const handleSearch = (query: string, matched: any[]) => {
    setSearchQuery(query);
    setSearchResults(matched.filter((a) => a.status === 'published'));
    setSearched(true);
  };

  const baseArticles = searched ? searchResults : allPublished;

  const sortedArticles = (tab: Tab) => {
    const list = [...baseArticles];
    if (tab === 'ranking') return list.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    if (tab === 'recommended') return list.filter((a) => a.recommended);
    return list.sort((a, b) => b.date.localeCompare(a.date));
  };

  const ArticleList = ({ articles }: { articles: any[] }) => {
    if (searched && articles.length === 0) {
      return (
        <p className="text-sm text-muted-foreground">
          「{searchQuery}」に一致する記事は見つかりませんでした。
        </p>
      );
    }
    return (
      <ul className="space-y-8">
        {articles.map((a) => (
          <li key={a.id} className="border-b border-border pb-8">
            <a href={`/article/${a.id}`} className="flex items-center gap-3 hover:opacity-80">
              {a.thumbnail && (
                <img src={a.thumbnail} alt={a.title} className="w-48 h-36 object-cover shrink-0" />
              )}
              <div>
                <p className="text-xl text-blue-700 underline hover:text-blue-900 visited:text-purple-700">{a.title}</p>
                <p className="text-base text-muted-foreground mt-0.5">{a.date}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="container max-w-6xl mx-auto py-16 px-4">
          <div className="max-w-full mx-auto">
            <div className="max-w-sm mx-auto">
              <SearchForm articles={allArticles} onSearch={handleSearch} />
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as Tab)}
              className="mt-6"
            >
              <TabsList className="w-full bg-transparent border-b border-border rounded-none p-0 h-auto gap-0">
                <TabsTrigger value="list" className="flex-1 text-2xl" onClick={() => { setSearched(false); setSearchQuery(''); }}>一覧</TabsTrigger>
                <TabsTrigger value="ranking" className="flex-1 text-2xl" onClick={() => { setSearched(false); setSearchQuery(''); }}>ランキング</TabsTrigger>
                <TabsTrigger value="recommended" className="flex-1 text-2xl" onClick={() => { setSearched(false); setSearchQuery(''); }}>おすすめ</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-4">
                <ArticleList articles={sortedArticles('list')} />
              </TabsContent>
              <TabsContent value="ranking" className="mt-4">
                <ArticleList articles={sortedArticles('ranking')} />
              </TabsContent>
              <TabsContent value="recommended" className="mt-4">
                <ArticleList articles={sortedArticles('recommended')} />
              </TabsContent>
            </Tabs>
          </div>
        </article>
      </main>
    </div>
  );
}

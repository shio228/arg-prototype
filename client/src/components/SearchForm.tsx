import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  articles: any[];
  onSearch?: (query: string, results: any[]) => void;
}

export default function SearchForm({ articles, onSearch }: SearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const qLower = q.toLowerCase();
    const results = articles.filter((a) => {
      if (a.hidden) return a.searchKeyword === q;
      return a.title.toLowerCase().includes(qLower);
    });
    onSearch?.(q, results);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="記事を検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[0_0_0_2px_rgba(239,68,68,0.4),0_0_12px_4px_rgba(239,68,68,0.25)]"
          />
        </div>
        <Button type="submit" className="px-6 bg-red-500 hover:bg-red-600 text-white rounded-full">
          検索
        </Button>
      </div>
    </form>
  );
}

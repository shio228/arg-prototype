import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getArticles } from '@/lib/api';

interface SearchFormProps {
  onSearch?: (query: string, results: any[]) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [allArticles, setAllArticles] = useState<any[]>([]);

  useEffect(() => {
    getArticles().then(setAllArticles);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const results = allArticles.filter((a) => a.title.toLowerCase().includes(q));
    onSearch?.(query.trim(), results);
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
            className="pl-10 bg-background border-border"
          />
        </div>
        <Button type="submit" variant="default" className="px-6">
          検索
        </Button>
      </div>
    </form>
  );
}

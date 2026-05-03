import { useState } from 'react';
import { useLocation } from 'wouter';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { checkPuzzleAnswer, checkHiddenPageKeyword } from '@/types/puzzle';

export default function PuzzleForm() {
  const [input, setInput] = useState('');
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // 謎の答えをチェック
    const puzzleAnswer = checkPuzzleAnswer(input);
    if (puzzleAnswer) {
      setLocation(puzzleAnswer.nextRoute);
      setInput('');
      return;
    }

    // 隠しページキーワードをチェック
    const hiddenPageRoute = checkHiddenPageKeyword(input);
    if (hiddenPageRoute) {
      setLocation(hiddenPageRoute);
      setInput('');
      return;
    }

    // 正解でない場合は失敗ページに遷移
    setLocation('/failure');
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="サイト内を検索..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
        <Button
          type="submit"
          variant="default"
          className="px-6"
        >
          検索
        </Button>
      </div>
    </form>
  );
}

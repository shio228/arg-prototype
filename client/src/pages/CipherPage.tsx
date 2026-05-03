import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';

export default function CipherPage() {
  const [, setLocation] = useLocation();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedInput = input.trim().toLowerCase();
    
    if (normalizedInput === 'decode') {
      setLocation('/clear');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">最後の謎</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6 mb-8">
            <p>
              ここに辿り着いたあなたは、すべての謎を解いてきました。
            </p>
            <p>
              最後に残された暗号があります。この暗号を解くことで、この世界の真実が明らかになるでしょう。
            </p>
            <p>
              暗号を解いてください。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="暗号を入力..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="px-6">
                送信
              </Button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/hidden/2">
              <Button variant="outline" className="w-full">
                戻る
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

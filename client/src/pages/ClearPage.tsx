import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function ClearPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <article className="container max-w-2xl mx-auto py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-8 text-foreground">謎解きをクリアしました</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6 mb-12">
            <p>
              すべての謎を解き、この世界の真実に辿り着きました。
            </p>
            <p>
              あなたの冒険はここで終わりを迎えます。
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full">
                ホームに戻る
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

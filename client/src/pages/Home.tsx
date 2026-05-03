import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">謎の世界へようこそ</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6">
            <p>
              あなたは不可思議な世界に迷い込みました。この世界には、隠された謎が散りばめられています。
            </p>
            
            <p>
              ページ内に隠された手がかりを探し、謎を解いていくことで、この世界の真実が徐々に明かされていくでしょう。
            </p>
            
            <p>
              上部の検索フォームを使用して、見つけた謎の答えを入力してください。正しい答えが入力されると、次の段階へ進むことができます。
            </p>
            
            <p>
              さあ、謎解きの旅を始めましょう。
            </p>
          </div>

          <div className="mt-12">
            <Link href="/story/1">
              <Button size="lg" className="w-full sm:w-auto">
                物語を始める
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

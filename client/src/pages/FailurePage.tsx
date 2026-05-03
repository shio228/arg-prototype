import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function FailurePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <article className="container max-w-2xl mx-auto py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-8 text-foreground">謎が解けませんでした</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6">
            <p>
              入力された答えは、この世界の謎ではないようです。
            </p>
            
            <p>
              もう一度、ページ内の手がかりをよく探してみてください。
            </p>
          </div>

          <div className="mt-12">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                ホームに戻る
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

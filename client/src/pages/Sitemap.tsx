import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Sitemap() {
  const pages = [
    { title: 'ホームページ', path: '/', description: 'サイトのトップページ' },
    { title: 'ストーリーページ 1', path: '/story/1', description: '第一章の物語' },
    { title: 'ストーリーページ 2', path: '/story/2', description: '第二章の物語' },
    { title: 'お問い合わせ', path: '/contact', description: 'ご質問やご意見をお送りください' },
    { title: 'プライバシーポリシー', path: '/privacy', description: '個人情報の取り扱いについて' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">サイトマップ</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6 mb-8">
            <p>
              ARGプロトタイプサイトのページ一覧です。以下のリンクからアクセスできます。
            </p>
          </div>

          <div className="space-y-4">
            {pages.map((page) => (
              <Link key={page.path} href={page.path}>
                <div className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-foreground mb-1">{page.title}</h3>
                  <p className="text-sm text-foreground/70">{page.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/">
              <Button variant="outline" className="w-full">
                ホームに戻る
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

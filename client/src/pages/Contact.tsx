import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // お問い合わせ機能は実装しないため、何もしない
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">お問い合わせ</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6 mb-8">
            <p>
              ARGプロトタイプサイトに関するご質問やご意見がございましたら、以下のフォームからお気軽にお問い合わせください。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">お名前</Label>
              <Input
                id="name"
                type="text"
                placeholder="山田太郎"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">件名</Label>
              <Input
                id="subject"
                type="text"
                placeholder="お問い合わせの件名"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">メッセージ</Label>
              <Textarea
                id="message"
                placeholder="ご質問やご意見をお聞かせください"
                rows={6}
                className="bg-background border-border"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                送信
              </Button>
              <Link href="/">
                <Button type="button" variant="outline" className="flex-1">
                  キャンセル
                </Button>
              </Link>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-border space-y-4">
            <p className="text-sm text-muted-foreground">
              ※ 現在、このお問い合わせフォームは表示用です。実際のお問い合わせ機能は実装されていません。
            </p>
            <p className="text-sm text-muted-foreground">
              <Link href="/privacy" className="text-foreground/70 hover:text-foreground transition-colors underline">
                プライバシーポリシー
              </Link>
              をご確認ください。
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}

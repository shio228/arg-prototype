import { useParams, Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface SuccessContent {
  title: string;
  content: string;
  nextLink?: {
    href: string;
    label: string;
  };
  hiddenLink?: {
    href: string;
    label: string;
  };
}

const SUCCESS_CONTENTS: Record<string, SuccessContent> = {
  '1': {
    title: '第一章',
    content: `
      謎を解いたあなたの前に、新たな景色が広がった。

      かつて隠されていた世界の一部が、今、あなたの目の前に明かされている。

      この先には、さらなる謎が待っているに違いない。
    `,
    nextLink: {
      href: '/story/2',
      label: '次へ',
    },
    hiddenLink: {
      href: '/hidden/1',
      label: '隠しページを探索',
    },
  },
  '2': {
    title: '第二章',
    content: `
      さらに深い謎が解き明かされた。

      世界の真実は、想像していたよりも複雑で、奥深いものだった。

      あなたは今、この世界の秘密に一歩近づいている。
    `,
    hiddenLink: {
      href: '/hidden/2',
      label: '隠しページを探索',
    },
  },
};

export default function SuccessPage() {
  const params = useParams();
  const successId = params.id || '1';
  const success = SUCCESS_CONTENTS[successId];

  if (!success) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <article className="container max-w-2xl mx-auto py-16 px-4">
            <h1 className="text-2xl font-bold mb-8">ページが見つかりません</h1>
            <Link href="/">
              <Button>ホームに戻る</Button>
            </Link>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">{success.title}</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6 whitespace-pre-wrap">
            {success.content}
          </div>

          <div className="mt-12 space-y-3 flex flex-col">
            {success.nextLink && (
              <Link href={success.nextLink.href}>
                <Button className="w-full">
                  {success.nextLink.label}
                </Button>
              </Link>
            )}
            {success.hiddenLink && (
              <Link href={success.hiddenLink.href}>
                <Button variant="outline" className="w-full">
                  {success.hiddenLink.label}
                </Button>
              </Link>
            )}
            <Link href="/">
              <Button variant="ghost" className="w-full">
                ホーム
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

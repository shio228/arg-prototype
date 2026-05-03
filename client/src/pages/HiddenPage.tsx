import { useParams, Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface HiddenContent {
  title: string;
  content: string;
  nextLink?: {
    href: string;
    label: string;
  };
}

const HIDDEN_CONTENTS: Record<string, HiddenContent> = {
  '1': {
    title: '隠された真実（第一章）',
    content: `
      あなたは、隠された世界へ到達した。

      この場所は、多くの人には知られていない。ここには、世界の秘密が刻まれている。

      第一章の謎を解いたあなただけが、この真実を知ることができた。

      しかし、これはまだ始まりに過ぎない。

      さらなる謎が、この世界の奥底に眠っているのだ。
    `,
    nextLink: {
      href: '/hidden/2',
      label: '次の隠しページへ',
    },
  },
  '2': {
    title: '隠された真実（第二章）',
    content: `
      ついに、最後の謎が解き明かされた。

      この世界の全貌が、あなたの前に明かされている。

      あなたが見つけた手がかり、解いた謎、そして辿り着いた場所。

      すべてが、この瞬間に繋がっている。

      謎解きの旅は、ここで一つの区切りを迎える。

      しかし、本当の冒険は、ここからかもしれない。
    `,
    nextLink: {
      href: '/cipher',
      label: '最後の謎へ',
    },
  },
};

export default function HiddenPage() {
  const params = useParams();
  const hiddenId = params.id || '1';
  const hidden = HIDDEN_CONTENTS[hiddenId];

  if (!hidden) {
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
          <h1 className="text-4xl font-bold mb-8 text-foreground">{hidden.title}</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6 whitespace-pre-wrap">
            {hidden.content}
          </div>

          <div className="mt-12 space-y-3 flex flex-col">
            {hidden.nextLink && (
              <Link href={hidden.nextLink.href}>
                <Button className="w-full">
                  {hidden.nextLink.label}
                </Button>
              </Link>
            )}
            <Link href="/">
              <Button variant="outline" className="w-full">
                ホーム
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

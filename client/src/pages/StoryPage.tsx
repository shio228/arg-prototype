import { useParams } from 'wouter';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface StoryContent {
  title: string;
  content: string;
  hint: string;
}

const STORY_CONTENTS: Record<string, StoryContent> = {
  '1': {
    title: '第一章：謎の始まり',
    content: `
      暗い森の中を歩いていると、古い石造りの建物が見えてきた。その壁には、何かが刻まれているようだ。

      建物の中に入ると、埃をかぶった本棚が目に入った。本の背には、奇妙な文字が書かれている。MYSTERY、ANCIENT、KNOWLEDGE...

      テーブルの上には、古い地図が広げられていた。地図には数字が記されている。42、13、7...

      この場所には何か重要な秘密が隠されているに違いない。周囲をよく観察してみよう。
    `,
    hint: '建物の中に見える単語に注目してください。',
  },
  '2': {
    title: '第二章：深まる謎',
    content: `
      前の章で得た手がかりを頼りに、さらに奥へ進むことにした。

      廊下の壁には、古い絵画が飾られていた。

      最初の絵画には、太陽が描かれている。
      次の絵画には、月が描かれている。
      その次の絵画には、星が描かれている。
      最後の絵画には、光の道が描かれている。

      各絵画の下には、小さなプレートがあり、謎めいた言葉が書かれていた。

      さらに進むと、大きな扉が現れた。扉の上には、暗号が刻まれている。CIPHER...

      この謎を解かなければ、先へは進めないようだ。
    `,
    hint: '各要素の最初の文字に注目してください。',
  },
};

export default function StoryPage() {
  const params = useParams();
  const storyId = params.id || '1';
  const story = STORY_CONTENTS[storyId];

  if (!story) {
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
          <h1 className="text-4xl font-bold mb-8 text-foreground">{story.title}</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6 whitespace-pre-wrap">
            {story.content}
          </div>

          <div className="mt-12 space-y-4">
            <p className="text-sm text-muted-foreground italic">
              上部の検索フォームで謎の答えを入力してください。
            </p>
            <Link href="/">
              <Button variant="outline">ホームに戻る</Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        fontFamily: 'keifont, sans-serif',
        background: 'radial-gradient(110% 80% at 50% 45%, oklch(0.18 0.01 60) 0%, oklch(0.10 0.01 60) 70%, oklch(0.04 0 0) 100%)',
        '--foreground': 'oklch(0.94 0.02 80)',
        '--muted-foreground': 'oklch(0.65 0.02 80)',
        '--border': 'rgba(255,235,200,0.15)',
        '--background': 'oklch(0.12 0.01 60)',
      } as React.CSSProperties}
    >
      <div className="home-grain" style={{ zIndex: 0 }} />
      <div className="home-vignette" style={{ zIndex: 1 }} />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">このサイトについて</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">■はじめまして！！！</h2>
              <p className='text-lg'>
              「都市伝説愛好会」管理人の『管理人』です！（気の利いた名前が思いつかなくてそのままです笑）
              </p>

            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">■ このサイトの目的</h2>
              <p className='text-lg'>
                ここは、都市伝説やオカルト、不思議な話が大好きな人たちが集まる秘密の遊び場です！<br />
                ネットの噂、地元の怪談、廃墟の探索レポートなどなど……みんなでたくさんの情報を持ち寄って、記事を読み合ったり、楽しく交流しましょう！<br />
                怖い話が苦手な人も大丈夫。ここではみんな「仲間」だから、絶対に安心ですよ。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">■ ちょっと特殊な「検索窓」の使い方</h2>
              <p className='text-lg'>
                当サイトの検索窓ですが、普通の記事検索のほかに「合言葉マッチ」という特別機能を搭載しています！<br />
                実は、「特定のキーワード（合言葉）」を知っている人だけが読めるシークレット記事を投稿者さんが設定できるようにしてあるんです。<br />
                公開されている記事の中に隠された不自然な言葉や、謎解きの答えを検索窓に入力すると……普段は見えない秘密のページに繋がるかも！？<br />
                宝探し感覚でサイトの隅々まで読んでみてくださいね。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">■ 新規登録について（重要！）</h2>
              <p className='text-lg'>
                現在、海外からのスパム書き込みが増えてしまったため、一時的に合言葉がなければ新規登録ができないよう設定してるんです……ごめんなさい！<br />
                でも、せっかくこの「このサイトについて」を最後まで読んでくれた熱心なあなたには、特別に新規登録用のゲートをお教えしちゃいます！<br />
                あなたみたいなオカルト好きの方と、もっともっと深く繋がりたいんです。<br />
                ↓合言葉が入力済みの特別リンクはこちら！↓<br />
                <Link href="/NotFound" onClick={() => window.scrollTo(0, 0)} className="text-foreground/70 text-blue-700 underline hover:text-blue-900 visited:text-purple-700">
                [＞＞特別新規登録ゲートへ進む＜＜]<br />
                </Link>
                ぜひ登録して、私たちの「仲間」になってくださいね。<br />
                ずっと、お待ちしています！<br />
                2026年追記：新規登録者さんだけに伝わる方法で、私たちの新しい遊び場をご連絡いたします。合言葉を見つけてください。
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );

}

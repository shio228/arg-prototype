import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Rules() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'keifont, sans-serif' }}>
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">管理人とのお約束</h1>
          <p className='text-lg'>
            本サイトでは、都市伝説・未解決事象・怪異に関する記事を投稿いただくにあたり、以下の内容を遵守していただきます。
          </p>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">1. 投稿内容について</h2>
              <ul className="list-disc list-inside text-lg space-y-2 ml-4">
                <li>創作、体験談、考察いずれも投稿可能です。</li>
                <li>ただし、事実と異なる内容を断定的に「実在する」と誤認させる表現は避けてください。</li>
                <li>現実の人物・団体を誹謗中傷する内容は禁止します。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">2. 禁止事項</h2>
              <ul className="list-disc list-inside text-lg space-y-2 ml-4">
                <li>違法行為を助長する内容</li>
                <li>過度に暴力的・性的・差別的な表現</li>
                <li>個人情報の掲載（特定可能な情報を含む）</li>
                <li>著作権を侵害するコンテンツ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">3. コンテンツの取り扱い</h2>
              <p className='text-lg'>
                投稿された内容の著作権は投稿者に帰属しますが、本サイト上での掲載・編集・紹介の権利を運営者に許諾するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">4. アカウントについて</h2>
              <p className='text-lg'>
                不適切な投稿が確認された場合、投稿の削除やアカウントの停止を行うことがあります。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">5. 免責事項</h2>
              <ul className="list-disc list-inside text-lg space-y-2 ml-4">
                <li>本サイトの内容は娯楽・フィクションを含みます。</li>
                <li>閲覧・解釈により生じたいかなる損害についても、運営は責任を負いません。</li>
              </ul>
            </section>

            <section>
              <p className='text-lg'>
                以上に同意の上、投稿を行ってください。
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}

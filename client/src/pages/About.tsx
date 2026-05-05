import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8 text-foreground">このサイトについて</h1>
          
          <div className="prose prose-sm max-w-none text-foreground/90 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">1. 個人情報の取得について</h2>
              <p>
                ARGプロトタイプサイト（以下「本サイト」）では、お問い合わせフォームを通じて、お名前、メールアドレス、その他の個人情報をお預かりすることがあります。これらの情報は、お客様のご同意のもとでのみ取得されます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">2. 個人情報の利用目的</h2>
              <p>
                取得した個人情報は、以下の目的でのみ利用されます：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>お問い合わせへの対応</li>
                <li>サービスの改善と向上</li>
                <li>ユーザーサポートの提供</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">3. 個人情報の保護</h2>
              <p>
                本サイトは、お預かりした個人情報を厳重に保護いたします。個人情報は、本人の同意なく第三者に開示・提供することはありません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">4. クッキーについて</h2>
              <p>
                本サイトでは、ユーザーエクスペリエンスの向上を目的として、クッキーを使用することがあります。クッキーは、個人を特定する情報を含まないものです。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">5. 外部サービスの利用</h2>
              <p>
                本サイトは、分析やマーケティングの目的で、外部サービスを利用することがあります。これらのサービスは、独自のプライバシーポリシーに従って個人情報を取り扱います。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">6. ポリシーの変更</h2>
              <p>
                本プライバシーポリシーは、予告なく変更される可能性があります。変更があった場合は、本サイトに掲載いたします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">7. お問い合わせ</h2>
              <p>
                本プライバシーポリシーに関するご質問やご懸念がございましたら、お問い合わせページからご連絡ください。
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border space-y-3">
            <Link href="/">
              <Button variant="ghost" className="w-full">
                ホームに戻る
              </Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

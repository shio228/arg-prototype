import { Link } from 'wouter';

const updateHistory = [
  { date: "2026-06-13", content: "新規登録の募集（詳細は[このサイトについて]より）" },
  { date: "2016-06-13", content: "新規登録、記事投稿、プロフ編集の一時停止（再開未定）" },
  { date: "2016-06-01", content: "新しい仲間を大歓迎中！！これを読んだあなたもぜひ！" },
  { date: "2016-05-31", content: "荒らしが酷いので、掲示板機能は取りやめます涙" },
  { date: "2016-05-30", content: "掲示板機能を導入しました！" },
  { date: "2016-05-26", content: "☆おすすめ記事をピックアップしてみました☆" },
  { date: "2016-05-25", content: "またまた新しい仲間が増えました（身内です笑）" },
  { date: "2016-05-15", content: "さっそく新しい仲間がたくさん！記事も続々で大感謝！" },
  { date: "2016-05-01", content: "サイトを公開しました！" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-neutral-950 py-8">
      <div className="container">

        <div className="flex items-start mb-6">
          <div className="w-72 shrink-0">
            <p className="text-sm font-semibold text-neutral-300 mb-2">更新履歴</p>
            <div className="h-32 overflow-y-auto border border-white/10 rounded p-3 bg-white/5 text-sm text-neutral-400 space-y-1">
              {updateHistory.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 text-neutral-500">{item.date}</span>
                  <span>{item.content}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center gap-6 text-sm pt-7">
            <Link href="/about" onClick={() => window.scrollTo(0, 0)} className="text-blue-400 underline hover:text-blue-300 visited:text-purple-400">
              このサイトについて
            </Link>
            <Link href="/rules" onClick={() => window.scrollTo(0, 0)} className="text-blue-400 underline hover:text-blue-300 visited:text-purple-400">
              管理人とのお約束
            </Link>
          </div>

          <div className="w-72 shrink-0" />
        </div>

        <p className="text-center text-sm text-neutral-500">&copy; 2016. All rights reserved.</p>
        <p className="text-center text-sm text-neutral-500">※本サイトはフィクションです。実在する人物・団体とは一切関係ありません。</p>
      </div>
    </footer>
  );
}

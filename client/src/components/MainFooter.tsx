import { Link } from 'wouter';

const updateHistory = [
  { date: "2016-05-05", content: "サイト公開" },
  { date: "2016-05-05", content: "サイト公開" },
  { date: "2016-05-05", content: "サイト公開" },
  { date: "2016-05-05", content: "サイト公開" },
  { date: "2016-05-05", content: "サイト公開" },
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
      </div>
    </footer>
  );
}

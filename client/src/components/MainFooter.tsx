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
    <footer className="w-full border-t border-border bg-background py-8">
      <div className="container">

        <div className="flex items-start mb-6">
          <div className="w-72 shrink-0">
            <p className="text-sm font-semibold text-foreground/80 mb-2">更新履歴</p>
            <div className="h-32 overflow-y-auto border border-border rounded p-3 bg-muted/30 text-sm text-muted-foreground space-y-1">
              {updateHistory.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 text-foreground/50">{item.date}</span>
                  <span>{item.content}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center gap-6 text-sm pt-7">
            <Link href="/about" onClick={() => window.scrollTo(0, 0)} className="text-foreground/70 text-blue-700 underline hover:text-blue-900 visited:text-purple-700">
              このサイトについて
            </Link>
            <Link href="/rules" onClick={() => window.scrollTo(0, 0)} className="text-foreground/70 text-blue-700 underline hover:text-blue-900 visited:text-purple-700">
              管理人とのお約束
            </Link>
          </div>

          <div className="w-72 shrink-0" />
        </div>

        <p className="text-center text-sm text-muted-foreground">&copy; 2016. All rights reserved.</p>
      </div>
    </footer>
  );
}

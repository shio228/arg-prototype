import { Link } from 'wouter';
import PuzzleForm from './PuzzleForm';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* 1行目: ロゴと検索フォーム */}
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <span>ARG Prototype</span>
        </Link>
        <div className="flex-1 max-w-md mx-auto px-4">
          <PuzzleForm />
        </div>
      </div>

      {/* 2行目: ナビゲーションリンク */}
      <nav className="border-t border-border bg-muted/50">
        <div className="container flex h-12 items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            ホーム
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            お問い合わせ
          </Link>
        </div>
      </nav>
    </header>
  );
}

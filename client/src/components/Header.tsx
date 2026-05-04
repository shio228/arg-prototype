import { Link } from 'wouter';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <span>都市伝説愛好会</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* ログイン */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full w-fit">
            <button className="px-6 py-2 rounded-full text-sm font-medium transition bg-red-500 text-white">ログイン</button>
          </div>
          {/* 新規登録 */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full w-fit">
            <button className="px-6 py-2 rounded-full text-sm font-medium transition border border-red-500 text-red-500 bg-white">新規登録</button>
          </div>
        </div>
      </div>
    </header>
  );
}

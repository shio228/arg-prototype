import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-8">
      <div className="container">
        <div className="flex justify-center gap-6 mb-6 text-sm">
          <Link href="/sitemap" className="text-foreground/70 hover:text-foreground transition-colors">
            サイトマップ
          </Link>
          <Link href="/privacy" className="text-foreground/70 hover:text-foreground transition-colors">
            プライバシーポリシー
          </Link>
        </div>
        <p className="text-center text-sm text-muted-foreground">&copy; 2026 ARG Prototype. All rights reserved.</p>
      </div>
    </footer>
  );
}

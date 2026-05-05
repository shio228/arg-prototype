import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { verifyUser } from '@/lib/auth';
import { getArticles } from '@/lib/api';

interface Author {
  id: string;
  name: string;
}

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (author: Author) => void;
}

function LoginDialog({ open, onClose, onLoginSuccess }: LoginDialogProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await verifyUser(id, password);
    setLoading(false);

    if (!ok) {
      setError('IDまたはパスワードが正しくありません。');
      return;
    }

    // 著者情報取得
    const authorsRes = await fetch('/data/authors.json');
    const authors: Author[] = await authorsRes.json();
    const author = authors.find((a) => a.id === id)!;

    // 著者の最新記事を取得してリダイレクト
    const articles = await getArticles();
    const latest = articles
      .filter((a: any) => a.authorId === id && a.status === 'published')
      .sort((a: any, b: any) => b.date.localeCompare(a.date))[0];

    onLoginSuccess(author);
    onClose();
    setId('');
    setPassword('');

    if (latest) {
      setLocation(`/article/${latest.id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>ログイン</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="login-id">ID</Label>
            <Input
              id="login-id"
              type="text"
              placeholder="例：a001"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="login-password">パスワード</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            {loading ? '確認中...' : 'ログイン'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function RegisterDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 新規登録処理
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>新規登録</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="reg-email">メールアドレス</Label>
            <Input
              id="reg-email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="reg-password">パスワード</Label>
            <Input
              id="reg-password"
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="reg-confirm">パスワード（確認）</Label>
            <Input
              id="reg-confirm"
              type="password"
              placeholder="パスワードを再入力"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full border border-red-500 text-red-500 bg-white hover:bg-red-50">
            登録する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loggedInAuthor, setLoggedInAuthor] = useState<Author | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/articleSearch" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <span>都市伝説愛好会</span>
        </Link>

        <div className="flex items-center gap-2">
          {loggedInAuthor ? (
            <>
              {/* 投稿ボタン（ハリボテ） */}
              <div className="flex items-center bg-gray-100 p-1 rounded-full w-fit hover:opacity-80">
                <button className="px-6 py-2 rounded-full text-sm font-medium transition bg-red-500 text-white">
                  投稿
                </button>
              </div>
              {/* ユーザー名ボタン */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center bg-gray-100 p-1 rounded-full w-fit hover:opacity-80 cursor-pointer">
                    <button className="px-6 py-2 rounded-full text-sm font-medium transition border border-red-500 text-red-500 bg-white">
                      {loggedInAuthor.name}
                    </button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-3" align="end">
                  <p className="text-xs text-muted-foreground mb-1">ログインID</p>
                  <p className="text-sm font-medium">{loggedInAuthor.id}</p>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              {/* ログイン */}
              <div className="flex items-center bg-gray-100 p-1 rounded-full w-fit hover:opacity-80">
                <button
                  onClick={() => setLoginOpen(true)}
                  className="px-6 py-2 rounded-full text-sm font-medium transition bg-red-500 text-white"
                >
                  ログイン
                </button>
              </div>
              {/* 新規登録 */}
              <div className="flex items-center bg-gray-100 p-1 rounded-full w-fit hover:opacity-80">
                <button
                  onClick={() => setRegisterOpen(true)}
                  className="px-6 py-2 rounded-full text-sm font-medium transition border border-red-500 text-red-500 bg-white"
                >
                  新規登録
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <LoginDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={setLoggedInAuthor}
      />
      <RegisterDialog open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </header>
  );
}

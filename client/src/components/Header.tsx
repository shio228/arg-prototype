import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { verifyUser } from '@/lib/auth';
import { getArticles } from '@/lib/api';
import { trackEvent } from '@/lib/analytics';

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
      setError('IDまたはパスワードが正しくありません。パスワードは英数小文字、8文字以上で入力してください');
      return;
    }

    trackEvent('login', { userId: id });

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
              placeholder="例：ULS888"
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

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
  onRegisterSuccess: (author: Author) => void;
}

function RegisterDialog({ open, onClose, onRegisterSuccess }: RegisterDialogProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.length > 16) {
      setError('ユーザー名は16文字以内で入力してください。');
      return;
    }
    if (password !== confirm) {
      setError('パスワードが一致しません。');
      return;
    }
    // 表記ゆれを吸収：前後の空白除去、全角英字→半角、大文字化してから比較
    const normalizedPassphrase = passphrase
      .trim()
      .replace(/[Ａ-Ｚａ-ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
      .toUpperCase();
    if (normalizedPassphrase !== 'OUROBOROS') {
      setError('合言葉が正しくありません。');
      return;
    }

    trackEvent('game_clear');

    const author: Author = { id: 'OUROBOROS0000', name: username };
    onRegisterSuccess(author);
    onClose();
    setUsername('');
    setPassword('');
    setConfirm('');
    setPassphrase('');
    setLocation('/article/25');
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>新規登録</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="reg-username">ユーザー名</Label>
            <Input
              id="reg-username"
              type="text"
              placeholder="ユーザー名（16文字まで）"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={16}
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
            <Label htmlFor="reg-confirm">パスワード（確認用）</Label>
            <Input
              id="reg-confirm"
              type="password"
              placeholder="パスワードを再入力"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="reg-passphrase">合言葉</Label>
            <Input
              id="reg-passphrase"
              type="text"
              placeholder="合言葉"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full border border-red-500 text-red-500 bg-white hover:bg-red-50">
            登録する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const SESSION_KEY = 'loggedInAuthorId';
const SESSION_NAME_KEY = 'loggedInAuthorName';
const SESSION_DATE_KEY = 'registeredDate';

async function restoreAuthor(): Promise<Author | null> {
  const savedId = sessionStorage.getItem(SESSION_KEY);
  if (!savedId) return null;
  if (savedId === 'OUROBOROS0000') {
    const savedName = sessionStorage.getItem(SESSION_NAME_KEY);
    return savedName ? { id: 'OUROBOROS0000', name: savedName } : null;
  }
  const res = await fetch('/data/authors.json');
  const authors: Author[] = await res.json();
  return authors.find((a) => a.id === savedId) ?? null;
}

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loggedInAuthor, setLoggedInAuthor] = useState<Author | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    restoreAuthor().then((author) => {
      if (author) setLoggedInAuthor(author);
    });
  }, []);

  const handleLoginSuccess = (author: Author) => {
    sessionStorage.setItem(SESSION_KEY, author.id);
    setLoggedInAuthor(author);
    window.dispatchEvent(new Event('auth-changed'));
  };

  const handleRegisterSuccess = (author: Author) => {
    sessionStorage.setItem(SESSION_KEY, author.id);
    sessionStorage.setItem(SESSION_NAME_KEY, author.name);
    sessionStorage.setItem(SESSION_DATE_KEY, new Date().toISOString().split('T')[0]);
    setLoggedInAuthor(author);
    window.dispatchEvent(new Event('auth-changed'));
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_NAME_KEY);
    sessionStorage.removeItem(SESSION_DATE_KEY);
    setLoggedInAuthor(null);
    window.dispatchEvent(new Event('auth-changed'));
    setLocation('/articleSearch');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950 border-b border-white/10">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/articleSearch" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity" style={{ fontFamily: 'Shippori Mincho, Yuji Syuku', color: 'oklch(0.94 0.02 80)' }}>
          <span>都市伝説愛好会</span>
        </Link>

        <div className="flex items-center gap-2">
          {loggedInAuthor ? (
            <>
              {/* 投稿ボタン（ハリボテ） */}
              <div className="flex items-center bg-white/10 p-1 rounded-full w-fit hover:opacity-80">
                <button className="px-6 py-2 rounded-full text-sm font-medium transition bg-red-500 text-white">
                  投稿
                </button>
              </div>
              {/* ユーザー名ボタン */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center bg-white/10 p-1 rounded-full w-fit hover:opacity-80 cursor-pointer">
                    <button className="px-6 py-2 rounded-full text-sm font-medium transition border border-red-400 text-red-400 bg-transparent">
                      {loggedInAuthor.name}
                    </button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-3" align="end">
                  <p className="text-xs text-muted-foreground mb-1">ログインID</p>
                  <p className="text-sm font-medium mb-3">{loggedInAuthor.id}</p>
                  <button className='w-full text-left text-sm text-red-500 hover:text-red-600 rounded px-3 py-1.5 hover:bg-red-50 transition-colors'>
                    プロフ編集
                  </button>
                  {loggedInAuthor.id !== 'OUROBOROS0000' && (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-sm text-red-500 hover:text-red-600 rounded px-3 py-1.5 hover:bg-red-50 transition-colors"
                    >
                      ログアウト
                    </button>
                  )}
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              {/* ログイン */}
              <div className="flex items-center bg-white/10 p-1 rounded-full w-fit hover:opacity-80">
                <button
                  onClick={() => setLoginOpen(true)}
                  className="px-6 py-2 rounded-full text-sm font-medium transition bg-red-500 text-white"
                >
                  ログイン
                </button>
              </div>
              {/* 新規登録 */}
              <div className="flex items-center bg-white/10 p-1 rounded-full w-fit hover:opacity-80">
                <button
                  onClick={() => setRegisterOpen(true)}
                  className="px-6 py-2 rounded-full text-sm font-medium transition border border-red-400 text-red-400 bg-transparent"
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
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterDialog open={registerOpen} onClose={() => setRegisterOpen(false)} onRegisterSuccess={handleRegisterSuccess} />
    </header>
  );
}

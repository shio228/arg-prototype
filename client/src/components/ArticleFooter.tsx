import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-neutral-950 py-8">
      <div className="container">
        <div className="flex justify-center gap-6 mb-6 text-sm">
        </div>
        <p className="text-center text-sm text-muted-foreground">&copy; 2016. All rights reserved.</p>
      </div>
    </footer>
  );
}

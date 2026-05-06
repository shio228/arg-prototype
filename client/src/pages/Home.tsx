import { Link } from 'wouter';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <article className="container max-w-2xl mx-auto py-16 px-4">
          <div className="mt-12">
            <a href={`/articleSearch`} className="text-base font-medium hover:underline">
              入口
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}

const SITE_URL = 'https://note.com/shio_salty/n/n14d9449b5264';

function buildShareUrl(text: string, hashtags: string[]) {
  const params = new URLSearchParams({
    text,
    url: SITE_URL,
    hashtags: hashtags.join(','), // #は不要
  });
  return `https://x.com/intent/post?${params.toString()}`;
}

export default function ShareToX() {
  const handleShare = () => {
    const shareUrl = buildShareUrl(
      '都市伝説愛好会の仲間になれました！',
      ['都市伝説愛好会ARG', 'ARG'],
    );
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={handleShare} className="px-6 py-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600">
      Xで登録完了報告する
    </button>
  );
}
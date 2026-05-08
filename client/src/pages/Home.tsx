import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

function pad(n: number, w = 2) { return String(n).padStart(w, '0'); }

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Home() {
  const [transit, setTransit] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [, setLocation] = useLocation();
  const now = useNow();

  useEffect(() => {
    if (!transit) return;
    const a = setTimeout(() => setRevealed(true), 600);
    const b = setTimeout(() => setLocation('/articleSearch'), 2400);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [transit]);

  const stamp =
    `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}  ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return (
    <div className={`home-stage ${!transit ? 'home-flicker' : ''}`}>
      <div className="home-grain" />
      <div className="home-vignette" />

      <div className="home-corners">
        <span className="tick tl" />
        <span className="tick tr" />
        <span className="tick bl" />
        <span className="tick br" />
        <div className="c-tl">No. 0007 / 都市伝説愛好会</div>
        <div className="c-tr">私的閲覧専用 ・ Private Archive</div>
        <div className="c-bl">{stamp}</div>
        <div className="c-br">取扱注意 ・ Handle With Care</div>
      </div>

      <div className="home-guide-v left" />
      <div className="home-guide-v right" />

      <div className="home-col">
        <div className="home-crest">
          <div className="home-crest-no">CASE FILE — 0 0 0 7</div>
          <div className="home-crest-eye" />
          <div className="home-crest-rule" />

          <div className="home-logo-frame">
            <div className="home-logo-side">怪 異 ・ 蒐 集 ・ 研 鑽</div>
            <div className="home-logo-main">都市伝説愛好会</div>
            <div className="home-logo-side">闇 ・ 噂 ・ 真 偽 不 明</div>
          </div>

          <div className="home-crest-rule" />
          <div className="home-crest-tag">URBAN  LEGEND  SOCIETY</div>
        </div>

        <div className="home-entrance-wrap">
          <div className="home-entrance-rule" />
          <button
            className="home-entrance"
            onClick={() => !transit && setTransit(true)}
            aria-label="入り口へ進む"
          >
            <div className="home-ento-plaque">
              <div className="home-ento-glow" />
              <div className="home-ento-kanji">入口</div>
              <div className="home-ento-seal">封</div>
            </div>
            <div className="home-ento-caption">
              ENTER  THE  ARCHIVE <span className="home-arrow">›››</span>
            </div>
          </button>
        </div>
      </div>

      <div className="home-footnote">
        ※ 一度入りし者、戻る術を持たず ・ once you enter, there is no record of leaving
      </div>

      <div className={`home-glitch-veil ${transit ? 'on' : ''}`}>
        <div className={`home-glitch-text ${revealed ? 'on' : ''}`}>
          扉 は 開 い た
        </div>
        <div className={`home-glitch-sub ${revealed ? 'on' : ''}`}>
          SIGNAL  LOST  —  ARCHIVE  RESPONDING …
        </div>
      </div>
    </div>
  );
}

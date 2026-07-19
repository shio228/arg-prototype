declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

// umamiが読み込まれていない環境（ローカル開発など）では何もしない
export function trackEvent(event: string, data?: Record<string, unknown>) {
  window.umami?.track(event, data);
}
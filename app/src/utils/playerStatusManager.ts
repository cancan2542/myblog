import { getVisitorStats, incrementPageView, type VisitorStats } from './firebase';

interface DisplayStats {
  dailyPageViews: number;
  totalPageViews: number;
  level: number;
  expPercent: number;
}

/**
 * ローカル開発環境かどうかを判定
 */
export function isLocalEnvironment(): boolean {
  return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
}

/**
 * 現在のパスでページビューがカウント済みかどうかを判定
 */
export function isPageViewCounted(pathname: string): boolean {
  const sessionKey = `pageViewCounted_${pathname}`;
  return sessionStorage.getItem(sessionKey) === 'true';
}

/**
 * ページビューをカウント済みとしてマーク
 */
export function markPageViewCounted(pathname: string): void {
  const sessionKey = `pageViewCounted_${pathname}`;
  sessionStorage.setItem(sessionKey, 'true');
}

/**
 * DOM要素の表示を更新
 */
export function updateDisplay(stats: DisplayStats): void {
  const dailyElement = document.querySelector('[data-daily]');
  const totalElement = document.querySelector('[data-total]');
  const levelElement = document.querySelector('[data-level]');
  const expFill = document.querySelector('[data-exp-percent]');

  if (dailyElement) {
    dailyElement.textContent = stats.dailyPageViews.toString();
    dailyElement.setAttribute('data-daily', stats.dailyPageViews.toString());
  }

  if (totalElement) {
    totalElement.textContent = stats.totalPageViews.toString();
    totalElement.setAttribute('data-total', stats.totalPageViews.toString());
  }

  if (levelElement) {
    levelElement.textContent = stats.level.toString();
    levelElement.setAttribute('data-level', stats.level.toString());
  }

  if (expFill) {
    (expFill as HTMLElement).style.width = stats.expPercent + '%';
    expFill.setAttribute('data-exp-percent', stats.expPercent.toString());
  }
}

/**
 * PlayerStatusコンポーネントを初期化
 */
export async function initPlayerStatus(): Promise<void> {
  try {
    // ローカル開発環境ではカウントしない
    if (isLocalEnvironment()) {
      updateDisplay({ dailyPageViews: 0, totalPageViews: 0, level: 0, expPercent: 0 });
      return;
    }

    const pathname = window.location.pathname;

    // セッションごとに1回だけカウント（リロード対策）
    if (!isPageViewCounted(pathname)) {
      // 初回訪問: カウントをインクリメントして結果を表示
      const stats = await incrementPageView();
      markPageViewCounted(pathname);
      updateDisplay(stats);
    } else {
      // リロード: 最新のカウントを取得して表示
      const stats = await getVisitorStats();
      updateDisplay(stats);
    }
  } catch (error) {
    console.error('PlayerStatus init error:', error);
  }
}

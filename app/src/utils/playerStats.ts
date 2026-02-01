// ページビュー管理のユーティリティ
export interface PlayerStats {
  totalPageViews: number;  // 通算訪問数
  dailyPageViews: number;  // 今日の訪問数
  lastVisitDate: string;   // 最後に訪問した日（YYYY-MM-DD）
  level: number;
  expPercent: number;
}

const DAILY_VIEWS_KEY = 'player_daily_views';
const TOTAL_VIEWS_KEY = 'player_total_views';
const LAST_VISIT_DATE_KEY = 'player_last_visit_date';

function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function getPlayerStats(): PlayerStats {
  if (typeof window === 'undefined') {
    return { totalPageViews: 0, dailyPageViews: 0, lastVisitDate: '', level: 0, expPercent: 0 };
  }

  // 各キーから値を取得
  const totalPageViews = parseInt(localStorage.getItem(TOTAL_VIEWS_KEY) || '0');
  let dailyPageViews = parseInt(localStorage.getItem(DAILY_VIEWS_KEY) || '0');
  let lastVisitDate = localStorage.getItem(LAST_VISIT_DATE_KEY) || getTodayDate();

  // 日付が変わった場合、dailyPageViews をリセット
  const today = getTodayDate();
  if (lastVisitDate !== today) {
    dailyPageViews = 0;
    lastVisitDate = today;
  }

  // 通算ビューからレベルを計算
  const { level, expPercent } = calculateLevel(totalPageViews);

  return { totalPageViews, dailyPageViews, lastVisitDate, level, expPercent };
}

export function incrementPageView(): PlayerStats {
  if (typeof window === 'undefined') {
    return { totalPageViews: 0, dailyPageViews: 0, lastVisitDate: '', level: 0, expPercent: 0 };
  }

  // 現在の統計を取得
  const totalPageViews = parseInt(localStorage.getItem(TOTAL_VIEWS_KEY) || '0');
  let dailyPageViews = parseInt(localStorage.getItem(DAILY_VIEWS_KEY) || '0');
  let lastVisitDate = localStorage.getItem(LAST_VISIT_DATE_KEY) || getTodayDate();

  // 日付が変わった場合、dailyPageViews をリセット
  const today = getTodayDate();
  if (lastVisitDate !== today) {
    dailyPageViews = 0;
    lastVisitDate = today;
  }

  // カウント増加
  const newTotalPageViews = totalPageViews + 1;
  const newDailyPageViews = dailyPageViews + 1;

  // 各キーに保存
  localStorage.setItem(TOTAL_VIEWS_KEY, newTotalPageViews.toString());
  localStorage.setItem(DAILY_VIEWS_KEY, newDailyPageViews.toString());
  localStorage.setItem(LAST_VISIT_DATE_KEY, today);

  const { level, expPercent } = calculateLevel(newTotalPageViews);

  return { totalPageViews: newTotalPageViews, dailyPageViews: newDailyPageViews, lastVisitDate: today, level, expPercent };
}

export function calculateLevel(pageViews: number): { level: number; expPercent: number } {
  let level = 0;
  let currentExp = pageViews;

  // 各レベルに必要なEXPを計算
  // Level 0: 0-0
  // Level 1: 0-10 (1*10)
  // Level 2: 10-30 (10+2*10)
  // Level 3: 30-60 (30+3*10)
  while (true) {
    const nextLevelExp = (level + 1) * 10;
    if (currentExp >= nextLevelExp) {
      currentExp -= nextLevelExp;
      level += 1;
    } else {
      break;
    }
  }

  // 現レベルで次のレベルまでのEXP進捗を計算
  const nextLevelExp = (level + 1) * 10;
  const expPercent = Math.round((currentExp / nextLevelExp) * 100);

  return { level, expPercent };
}

export function resetStats(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(DAILY_VIEWS_KEY);
    localStorage.removeItem(TOTAL_VIEWS_KEY);
    localStorage.removeItem(LAST_VISIT_DATE_KEY);
  }
}

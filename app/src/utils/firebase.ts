// Firebase設定と初期化
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get, runTransaction } from 'firebase/database';
import { calculateLevel } from './levelCalculator';

// レベル計算を再エクスポート（後方互換性のため）
export { calculateLevel } from './levelCalculator';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Firebaseアプリを初期化（既存のアプリがあれば再利用）
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

// 日付を取得（YYYY-MM-DD形式）
function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export interface VisitorStats {
  totalPageViews: number;
  dailyPageViews: number;
  lastVisitDate: string;
  level: number;
  expPercent: number;
}

// 訪問者統計を取得
export async function getVisitorStats(): Promise<VisitorStats> {
  try {
    const today = getTodayDate();
    
    // 通算ページビューを取得
    const totalRef = ref(database, 'stats/totalPageViews');
    const totalSnapshot = await get(totalRef);
    const totalPageViews = totalSnapshot.exists() ? totalSnapshot.val() : 0;
    
    // 今日のページビューを取得
    const dailyRef = ref(database, `stats/daily/${today}`);
    const dailySnapshot = await get(dailyRef);
    const dailyPageViews = dailySnapshot.exists() ? dailySnapshot.val() : 0;
    
    const { level, expPercent } = calculateLevel(totalPageViews);
    return {
      totalPageViews,
      dailyPageViews,
      lastVisitDate: today,
      level,
      expPercent,
    };
  } catch (error) {
    console.error('Firebase stats fetch error:', error);
    return {
      totalPageViews: 0,
      dailyPageViews: 0,
      lastVisitDate: '',
      level: 0,
      expPercent: 0,
    };
  }
}

// ページビューをインクリメント
export async function incrementPageView(): Promise<VisitorStats> {
  const today = getTodayDate();
  let newTotalPageViews = 0;
  let newDailyPageViews = 0;

  try {
    // 通算ページビューをインクリメント
    const totalRef = ref(database, 'stats/totalPageViews');

    await runTransaction(totalRef, (currentValue) => {
      newTotalPageViews = (currentValue || 0) + 1;
      return newTotalPageViews;
    });
  } catch (error) {
    console.error('Firebase total increment error:', error);
    // 通算カウント失敗時は日別カウントも行わずに既存の統計を返す
    return getVisitorStats();
  }

  try {
    // 今日のページビューをインクリメント
    const dailyRef = ref(database, `stats/daily/${today}`);

    await runTransaction(dailyRef, (currentValue) => {
      newDailyPageViews = (currentValue || 0) + 1;
      return newDailyPageViews;
    });
  } catch (error) {
    console.error('Firebase daily increment error:', error);
    // 日別カウント失敗時も通算は成功しているので、日別は既存値を使用
    const existingStats = await getVisitorStats();
    newDailyPageViews = existingStats.dailyPageViews;
  }

  const { level, expPercent } = calculateLevel(newTotalPageViews);

  return {
    totalPageViews: newTotalPageViews,
    dailyPageViews: newDailyPageViews,
    lastVisitDate: today,
    level,
    expPercent,
  };
}

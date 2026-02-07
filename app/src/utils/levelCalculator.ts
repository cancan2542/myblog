/**
 * レベル計算ユーティリティ
 * Firebase依存なしの純粋関数
 */

export interface LevelInfo {
  level: number;
  expPercent: number;
}

/**
 * ページビュー数からレベルと経験値パーセントを計算
 * レベルアップに必要な経験値: (現在レベル + 1) * 10
 */
export function calculateLevel(pageViews: number): LevelInfo {
  let level = 0;
  let currentExp = pageViews;

  while (true) {
    const nextLevelExp = (level + 1) * 10;
    if (currentExp >= nextLevelExp) {
      currentExp -= nextLevelExp;
      level += 1;
    } else {
      break;
    }
  }

  const nextLevelExp = (level + 1) * 10;
  const expPercent = Math.round((currentExp / nextLevelExp) * 100);

  return { level, expPercent };
}

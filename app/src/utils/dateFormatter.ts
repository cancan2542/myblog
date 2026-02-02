/**
 * 日付文字列を「YYYY.MM.DD」形式にフォーマット
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.');
}

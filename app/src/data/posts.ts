// 記事データの型定義
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  category: string;
  tag: string;
  author: string;
  readTime: string;
}

// ダミー記事データ
export const blogPosts: Record<string, BlogPost> = {
  '1': {
    id: '1',
    title: '効率的なリモートワークの始め方',
    description: 'リモートワークを活用する上では、良い作業環境が基本です。この記事を参考に、生産性を高める環境を整えましょう。',
    content: `
# 効率的なリモートワークの始め方

リモートワークが一般的になった今、自宅での作業環境をいかに整えるかが重要です。

## 1. 専用のワークスペースを作る

自宅にいても、仕事用のスペースと生活スペースを分けることが大切です。

- 専用のデスクを用意する
- キーボードとマウスは良質なものを選ぶ
- モニターは複数台あると効率が上がる
- 照明は十分に確保する

## 2. 通信環境を整備する

インターネット接続は仕事の生命線です。

\`\`\`
// WiFi速度テスト
const testConnection = async () => {
  const speed = await navigator.connection.downlink;
  return speed;
};
\`\`\`

## 3. 集中力を保つ工夫

- 定期的に休憩を取る
- 緑を目に入れる観葉植物を置く
- バックグラウンドミュージックを活用する
- ポモドーロ・テクニックを使う

## 4. コミュニケーションツールの選択

チームとのやり取りは明確に。

リモートワークの成功は、環境づくりから始まります。自分に合った環境を作ることで、生産性が大きく向上します。
    `,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop',
    date: '2026.01.10',
    category: 'Work',
    tag: 'WORK',
    author: 'ゲストプレイヤー',
    readTime: '5 min read'
  },
  '2': {
    id: '2',
    title: 'モーニングルーティンで自分を変える',
    description: '朝の過ごし方を変えることで、一日全体が変わります。毎朝のルーティンを実施することで、人生がどう変わるかを解説します。',
    content: `
# モーニングルーティンで自分を変える

朝の時間をいかに使うかが、人生全体の質を決めます。

## 朝の黄金時間

朝起きてから2時間は、創造性と集中力がピークです。

### おすすめのモーニングルーティン

1. **起床後すぐに水を飲む** - 脱水状態を改善
2. **軽い運動** - 血流をよくする
3. **瞑想** - 心を落ち着ける
4. **日記を書く** - 思考を整理
5. **朝食** - 栄養バランスを考慮

## 習慣化のコツ

- 21日続ける
- 小さなことから始める
- 記録をつける
- 環境を整える

モーニングルーティンは人生を変える強力なツールです。今日から始めてみてください。
    `,
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=400&fit=crop',
    date: '2026.01.05',
    category: 'Lifestyle',
    tag: 'LIFESTYLE',
    author: 'ゲストプレイヤー',
    readTime: '4 min read'
  },
  '3': {
    id: '3',
    title: '読書力からたろう5つの効果',
    description: '読書は私たちの人生を豊かにします。読書の習慣がもたらす5つの素晴らしい効果を紹介します。',
    content: `
# 読書力からたろう5つの効果

読書の力は無限大です。多くの成功者が読書の重要性を語っています。

## 1. 語彙力の向上

本を読むことで、日常では出会わない言葉に触れられます。

## 2. 知識の獲得

様々な分野の知識を効率的に学ぶことができます。

## 3. 思考力の強化

複雑なストーリーや論理を理解することで、思考力が鍛えられます。

## 4. ストレス軽減

読書はリラックス効果があり、心を落ち着かせます。

## 5. 創造性の向上

多くの物語や考え方に触れることで、新しいアイデアが生まれます。

## 本を選ぶコツ

- 興味がある分野から始める
- ベストセラーを参考にする
- 図書館で試し読みする

読書習慣をつけることで、人生が大きく変わります。
    `,
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=800&h=400&fit=crop',
    date: '2026.01.05',
    category: 'Learning',
    tag: 'LEARNING',
    author: 'ゲストプレイヤー',
    readTime: '6 min read'
  },
  '4': {
    id: '4',
    title: 'JavaScriptの非同期処理を理解する',
    description: 'JavaScriptの非同期処理は初心者にとって難しい概念ですが、理解することで作成できるアプリケーションの幅が大きく広がります。',
    content: `
# JavaScriptの非同期処理を理解する

JavaScriptの非同期処理は、モダンな開発に必須の知識です。

## 非同期処理とは

非同期処理とは、ある処理の完了を待たずに次の処理を実行することです。

## コールバック関数

\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('データ取得完了');
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
\`\`\`

## Promise

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  }, 1000);
});

promise.then(result => console.log(result));
\`\`\`

## async/await

\`\`\`javascript
async function getData() {
  const data = await fetch('/api/data');
  return data.json();
}

getData().then(data => console.log(data));
\`\`\`

## 非同期処理のベストプラクティス

- エラーハンドリングは必須
- コールバック地獄を避ける
- async/awaitを積極的に使う
- Promiseチェーンは適切に

非同期処理を理解することで、スムーズなユーザー体験を実現できます。
    `,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    date: '2026.01.03',
    category: 'Work',
    tag: 'WORK',
    author: 'ゲストプレイヤー',
    readTime: '8 min read'
  }
};

// 記事IDを取得する関数
export function getAllPostIds(): string[] {
  return Object.keys(blogPosts);
}

// 記事を取得する関数
export function getPostById(id: string): BlogPost | undefined {
  return blogPosts[id];
}

// 関連記事を取得する関数
export function getRelatedPosts(id: string, limit: number = 3): BlogPost[] {
  const post = blogPosts[id];
  if (!post) return [];
  
  return Object.values(blogPosts)
    .filter(p => p.id !== id && p.category === post.category)
    .slice(0, limit);
}

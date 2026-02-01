# microCMS Integration

## 日付
2026-02-01

## Issue
#5 - microCMS APIによるブログ記事の取得

## 概要
ブログ記事をハードコードされたデータからmicroCMS APIによる動的取得に変更。

## 作業内容

### 1. microCMS設定
- サービスドメイン: `canpark`
- APIエンドポイント: `articles`
- スキーマ: title, description, content, image, category, tag

### 2. 実装ファイル

#### app/src/lib/microcms.ts (新規作成)
- microCMS JavaScript SDKを使用したAPIクライアント
- `getArticles()`: 記事一覧取得
- `getArticle(id)`: 個別記事取得
- `getArticlesByCategory(categoryId)`: カテゴリ別記事取得

#### app/src/pages/index.astro (修正)
- microCMSから記事を取得するように変更
- 記事がない場合のメッセージ表示追加

#### app/src/pages/posts/[id].astro (修正)
- `getStaticPaths()`でmicroCMSから記事IDを取得
- 動的ルーティングでmicroCMS記事を表示

#### app/astro.config.mjs (修正)
- `build.format: 'directory'` に変更
- `trailingSlash: 'ignore'` に変更（URL柔軟性向上）

### 3. 環境変数
```
MICROCMS_SERVICE_DOMAIN=canpark
MICROCMS_API_KEY=***
```

### 4. GitHub Secrets追加
- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`

## 依存パッケージ
- `microcms-js-sdk: ^3.1.0`

## 動作確認
- ローカル開発環境で記事一覧・詳細表示確認
- GitHub Pagesへのデプロイ成功

## 関連コミット
- `feat: microCMS integration for blog articles`

## 備考
- microCMSのエンドポイント名を`article`から`articles`に変更して統一
- トレイリングスラッシュの問題を`ignore`設定で解決

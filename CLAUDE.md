# プロジェクト指示

このファイルはClaude Codeへの定常指示をまとめたものです。

## Git ワークフロー

### ブランチ構成

- `main` - 安定版ブランチ（releaseと同期）
- `release` - 本番デプロイ用ブランチ（マージで自動デプロイ）
- `feature/XX-description` - 機能開発用ブランチ
- `hotfix/XX-description` - 緊急修正用ブランチ

### 開発フロー

1. 作業前にIssueを起票する
   - Sub Issuesは別Issueではなく、親Issue内のチェックボックスでタスク管理する
2. Issue番号を含むブランチ名で作業ブランチを切る（例: `feature/35-workflow-change`）
3. 作業完了後、`release`ブランチへPRを作成する
4. PMがローカルで動作確認・コードレビューを行う
5. 問題がなければPMが`release`ブランチにマージ → 本番環境に自動デプロイ
6. PMが本番環境で反映を確認する
7. PMが`release` → `main`へPRを作成しマージする（同期）
8. Issueをクローズする

### コミットルール

- コミットメッセージにIssue番号を含める（例: `feat: 機能追加 (#30)`）
- 親Issue内のチェックボックスごとにコミットを分割する
- PR マージ後、作業ブランチを削除する
  - リモート側の自動削除は GitHub 設定で有効化済み
  - ローカル側は `git branch -d feature/XX` で削除する

## Docker環境

- npm install等のコマンドはdockerコンテナ内で実行する
- コンテナ名: `astro-blog-dev`
- 実行例: `docker exec -w /app astro-blog-dev npm install`

## プロジェクト構成

- `app/` - Astroアプリケーション本体
- `app/src/` - ソースコード
- `app/public/` - 静的ファイル
- `app/dist/` - ビルド出力

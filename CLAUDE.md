# プロジェクト指示

このファイルはClaude Codeへの定常指示をまとめたものです。

## Git ワークフロー

### ブランチ構成

- `main` - 本番環境にデプロイされるブランチ
- `release` - ステージング確認用ブランチ（PMが動作確認を行う）
- `feature/XX-description` - 機能開発用ブランチ
- `hotfix/XX-description` - 緊急修正用ブランチ

### 開発フロー

1. 作業前にIssueを起票する
   - Sub Issuesは別Issueではなく、親Issue内のチェックボックスでタスク管理する
2. Issue番号を含むブランチ名で作業ブランチを切る（例: `feature/30-release-branch`）
3. 作業完了後、`release`ブランチへPRを作成する
   - PRプレビュー機能でデプロイされたプレビューURLで動作確認可能
4. PMがプレビューURLで動作確認を行う
5. 問題がなければPMが`release`ブランチにマージする
6. PMが`release` → `main`へPRを作成しマージする
7. `main`へのマージで本番環境に自動デプロイされる
8. デプロイ完了後、Issueをクローズする

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

# プロジェクト指示

このファイルはClaude Codeへの定常指示をまとめたものです。

## Git ワークフロー

### ブランチ構成

- `main` - 安定版ブランチ（リリースタグの基点）
- `release` - 本番デプロイ用ブランチ（マージで自動デプロイ）
- `develop_ai` - AI（Claude Code）による開発用ブランチ
- `develop` - PM（cancan2542）による手動開発用ブランチ
- `feature/issue#XX` - 機能開発用ブランチ（`develop_ai` から作成）
- `hotfix/XX-description` - PM による緊急修正用ブランチ（`main` から作成）
- `hotfix-ai/XX-description` - Claude Code による緊急修正用ブランチ（`main` から作成）

### ブランチフロー

```txt
main ← release ← develop_ai ← feature/issue#XX
                ← develop    ← feature/XX（PM手動対応時）
main ← hotfix/XX（緊急修正時）
main ← hotfix-ai/XX（Claude Code 緊急修正時）
```

### 同期ルール

`main` にマージされたタイミングで、以下の4ブランチが常に同期された状態とする:

- `main`, `release`, `develop_ai`, `develop`

### 開発フロー（Claude Code）

1. 作業前にIssueを起票する
   - Sub Issuesは別Issueではなく、親Issue内のチェックボックスでタスク管理する
2. `develop_ai` が最新であることを確認する（`git pull origin develop_ai`）
3. `develop_ai` からブランチを作成する（例: `feature/issue#45`）
4. **PRを提出する前に、`develop_ai` の最新を取り込む**:
   - `git fetch origin` → `git merge origin/develop_ai` で feature ブランチを最新化
   - コンフリクトがあれば解消してからPRを作成する
5. `develop_ai` ブランチへPRを作成する
6. PRのリンクを対応するIssueにコメントで追記する
7. ローカルで動作確認・コードレビューを行う
8. develop_aiに対しPRを作成
9. 対応内容を確認し、問題がなければ `develop_ai` にマージ
10. Issueをクローズする
      - `release` へのマージ・デプロイはPMから指示があった場合に実施する

### 緊急修正フロー（hotfix）

1. `main` から `hotfix-ai/XX-description` ブランチを作成する
2. 修正を実施し、`release` へPRを作成しマージ → 自動デプロイ
3. 本番確認後、`release` → `main` へマージ（同期）
4. `main` → `develop_ai`, `main` → `develop` を同期する

### コミットルール

- コミットメッセージにIssue番号を含める（例: `feat: 機能追加 (#30)`）
- 親Issue内のチェックボックス（タスク）ごとにコミットを分割する
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

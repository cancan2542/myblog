# プロジェクト指示

このファイルはClaude Codeへの定常指示をまとめたものです。

## Git ワークフロー

- 作業前にIssueを起票する
- Issue起票後、作成したIssue番号を含むブランチ名で作業ブランチを切る（例: `feature/11-favicon`）
- mainブランチへ直接コミットせず、PRを作成する
- 作業完了後はIssueに実施内容を記録してクローズする
- コミットメッセージにIssue番号を含める（例: `feat: 機能追加 (#11)`）
- PR マージ後、作業ブランチを削除する
  - リモート側の自動削除は GitHub 設定で有効化済み
  - ローカル側は Claude Code 側で `git branch -d feature/XX` で削除する

## Docker環境

- npm install等のコマンドはdockerコンテナ内で実行する
- コンテナ名: `astro-blog-dev`
- 実行例: `docker exec -w /app astro-blog-dev npm install`

## プロジェクト構成

- `app/` - Astroアプリケーション本体
- `app/src/` - ソースコード
- `app/public/` - 静的ファイル
- `app/dist/` - ビルド出力

# プロジェクト指示

このファイルはClaude Codeへの定常指示をまとめたものです。

## Git ワークフロー

- 作業前にIssueを起票する
- Issue番号を含むブランチ名で作業する（例: `feature/11-favicon`）
- mainブランチへ直接コミットせず、PRを作成する
- 作業完了後はIssueに実施内容を記録してクローズする
- コミットメッセージにIssue番号を含める（例: `feat: 機能追加 (#11)`）

## Docker環境

- npm install等のコマンドはdockerコンテナ内で実行する
- コンテナ名: `astro-blog-dev`
- 実行例: `docker exec -w /app astro-blog-dev npm install`

## プロジェクト構成

- `app/` - Astroアプリケーション本体
- `app/src/` - ソースコード
- `app/public/` - 静的ファイル
- `app/dist/` - ビルド出力

# バックエンド - Spring Boot API

本ディレクトリは、Todo アプリケーションのバックエンドサーバー（API）を提供します。ユーザー管理、認証、およびデータの永続化を担当します。

## ⚙️ システム構成
- **ポート番号**: `8080`
- **データベース**: PostgreSQL (デフォルトポート `5432`)
- **セキュリティ**: Spring Security によるセッションベースの認証を実装。

## 🚀 ローカル開発環境での起動方法

Docker を使用せずに、Maven で直接起動する場合の手順は以下の通りです。

1.  PostgreSQL をセットアップし、`src/main/resources/application.properties` を環境に合わせて設定してください。
2.  以下のコマンドを実行します。
    ```bash
    ./mvnw spring-boot:run
    ```

## 🔐 主要 API エンドポイント
- `POST /auth/login`: ログイン認証。
- `POST /users`: 新規ユーザー登録。
- `GET /users`: ユーザー一覧取得（ADMIN 権限が必要）。
- `GET /users/{id}`: 特定ユーザーのプロファイル取得。

## 🐳 Docker 構成
`Dockerfile` では **マルチステージビルド** を採用し、軽量かつ安全なイメージを作成しています。
- **ビルド用ステージ**: Maven を使用してソースコードをコンパイル。
- **実行用ステージ**: JRE 17 Alpine をベースに、最小限の環境で JAR ファイルを実行。

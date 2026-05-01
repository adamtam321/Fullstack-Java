# フルスタック Todo アプリケーション (Spring Boot + React + PostgreSQL)

本プロジェクトは、バックエンドに Java Spring Boot、フロントエンドに React を使用した、フルスタックのユーザー管理および Todo 管理アプリケーションです。Docker を使用して、誰でも簡単に開発環境を構築できるよう設計されています。

## 🚀 使用技術スタック

### バックエンド
- **Java 17** / **Spring Boot 3.4.3**
- **Spring Security**: ロールベース（ADMIN/USER）の認証・認可を実装。
- **Spring Data JPA**: データベースとの O/R マッピングを管理。
- **PostgreSQL**: リレーショナルデータベースとして採用。
- **Maven**: プロジェクトのビルドおよび依存関係管理。

### フロントエンド
- **React 19** / **Vite**: 高速な開発環境とビルドを実現。
- **TypeScript**: 型安全な開発により、保守性を向上。
- **Ant Design (antd)**: 洗練された UI コンポーネントライブラリを採用。
- **Axios**: バックエンド API との非同期通信を管理。
- **React Router**: SPA 内のルーティングを制御。

---

## 🛠️ Docker を使用した起動方法（推奨）

Docker を使用することで、Java や Node.js をローカルにインストールすることなく、コマンド一つで全環境を構築できます。

1.  **前提条件**: [Docker Desktop](https://www.docker.com/products/docker-desktop) がインストールされていること。
2.  **起動コマンド**:
    プロジェクトのルートディレクトリで以下のコマンドを実行してください。
    ```bash
    docker-compose up --build
    ```
3.  **アクセス先**:
    - フロントエンド: [http://localhost](http://localhost)
    - バックエンド API: [http://localhost:8080](http://localhost:8080)

---

## 📂 プロジェクト構造
- `/backend`: Spring Boot ソースコード
- `/frontend`: React + Vite ソースコード
- `docker-compose.yml`: Docker コンテナの構成定義
- `.gitignore`: Git 管理除外設定

---
本プロジェクトは、技術スキルの証明および学習用として作成されました。

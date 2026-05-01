# フロントエンド - React + Vite + Ant Design

本ディレクトリは、Todo アプリケーションのユーザーインターフェース（UI）を提供します。React と TypeScript を使用し、直感的な操作感を実現しています。

## 🚀 使用技術
- **Vite**: 高速な開発サーバーとビルドツール。
- **Ant Design**: エンタープライズレベルの UI デザインシステム。
- **Axios**: バックエンド API との連携。

## 🛠️ ローカル開発環境での起動方法

1.  依存関係のインストール:
    ```bash
    npm install
    ```
2.  環境設定:
    `.env` ファイルを作成し、バックエンドの URL を設定してください。
    ```env
    VITE_BACKEND_URL=http://localhost:8080
    ```
3.  開発サーバーの起動:
    ```bash
    npm run dev
    ```

## 🏗️ ビルド方法
本番環境向けの静的ファイルを生成する場合：
```bash
npm run build
```

## 🐳 Docker 構成
Frontend の `Dockerfile` では、以下の 2 ステージ構成をとっています。
- **Build ステージ**: Node.js 20 を使用して React アプリをビルド。
- **Production ステージ**: 軽量な **Nginx** を採用し、ビルドされた静的ファイルをポート 80 で配信。

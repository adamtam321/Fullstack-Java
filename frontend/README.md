# フロントエンド - React JWT Dashboard

本ディレクトリは、JWT 認証を利用してバックエンドと通信する React アプリケーションです。

---

## 🏗️ 技術スタック
- **Core**: React 19 / TypeScript
- **State**: Context API (Auth Context)
- **Networking**: Axios (JWT Interceptor 搭載)
- **UI**: Ant Design

---

## 🛠️ 認証の実装詳細
- **Interceptor**: `axios.interceptors.request` を使用し、`localStorage` からトークンを読み取って自動的に `Authorization` ヘッダーへセットします。
- **Storage**: ログイン成功時に返却されたトークンとユーザー情報を `localStorage` に永続化します。
- **Auth Guard**: 認証情報の有無により、ログインページへのリダイレクトや ADMIN 専用画面の表示制限を行います。

---

## 🚀 ローカルでの開発手順
```bash
npm install
npm run dev
```
`.env` ファイルの `VITE_BACKEND_URL` が正しく設定されていることを確認してください。

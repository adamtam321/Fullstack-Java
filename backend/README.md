# バックエンド - JWT 対応 Spring Boot API

本ディレクトリは、JWT（JSON Web Token）認証を基盤とした、高機能なタスク管理 API サーバーです。

---

## 🏗️ 技術スタック
- **Framework**: Spring Boot 3.4.3
- **Security**: Spring Security + JWT (Stateless)
- **Token Library**: io.jsonwebtoken (JJWT)
- **Database**: PostgreSQL / Spring Data JPA

---

## 🔐 認証の仕組み (JWT Flow)
1. ユーザーが `/auth/login` に Email/Password を送信。
2. サーバーが認証に成功すると、JJWT で生成された **Access Token** を返却。
3. クライアントは以降の全リクエストの `Authorization` ヘッダーに `Bearer <Token>` を付与。
4. `JwtFilter` が各リクエストを検証し、SecurityContext を構築。

---

## 🚀 ローカルでの開発手順
```bash
./mvnw spring-boot:run
```
※ 初回起動時に `CommandLineRunner` により、デフォルトの Admin ユーザー (`admin@gmail.com` / `password`) が自動生成されます。

---

## 🔐 API エンドポイント（抜粋）
- `POST /auth/login`: ログイン（Token 発行）
- `GET /todos`: ユーザー別タスク取得
- `POST /users`: ユーザー登録
- `GET /users`: ユーザー一覧（ADMIN 専用）

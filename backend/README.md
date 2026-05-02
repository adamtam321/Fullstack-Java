# バックエンド - Spring Boot 3 高機能 API サーバー

本ディレクトリは、タスク管理システムのコアロジック、データ永続化、およびセキュリティ認証を担当する Spring Boot アプリケーションです。

---

## 🏗️ 技術スタックと設計
- **Framework**: Spring Boot 3.4.3
- **Security**: Spring Security (Session-based Authentication)
- **Database**: PostgreSQL / Spring Data JPA
- **API Documentation**: SpringDoc OpenAPI (Swagger UI)
- **Validation**: Jakarta Bean Validation による堅牢な入力チェック
- **Architecture**: Layered Architecture (Controller - Service - Repository - Entity)

---

## 🌟 主要な実装機能

### 1. 高度なタスク管理 (Todo Logic)
- **データ分離**: `SecurityContextHolder` を利用し、認証されたユーザーのタスクのみを取得・操作。
- **マルチフィールド**: タイトル、説明、優先度（HIGH/MEDIUM/LOW）、期日（Due Date）の管理。
- **一括バリデーション**: Entity および DTO レベルでのデータ整合性チェック。

### 2. 認証と認可 (Auth & Security)
- **パスワード保護**: `BCryptPasswordEncoder` によるハッシュ化保存。
- **ロールベースアクセス**: `ADMIN`（全ユーザー管理可能）と `USER`（個人タスクのみ）の権限分離。
- **API ドキュメント**: `/swagger-ui/index.html` にて、エンドポイントの自動ドキュメント化とテスト環境を提供。

---

## 🚀 ローカルでの開発手順

### 前提条件
- JDK 17 以上
- Maven
- 動作中の PostgreSQL

### 起動方法
1. `src/main/resources/application.properties` を環境に合わせて設定。
2. 依存関係のインストールと起動:
   ```bash
   ./mvnw spring-boot:run
   ```

---

## 🔐 API エンドポイント（抜粋）

### 認証
- `POST /auth/login`: ユーザーログイン

### タスク管理 (認証必須)
- `GET /todos`: ログインユーザーのタスク一覧取得
- `POST /todos`: 新規タスク作成（自動的に作成者に紐付け）
- `PUT /todos/{id}`: タスクの更新
- `DELETE /todos/{id}`: タスクの削除

### ユーザー管理 (ADMIN 権限必須)
- `GET /users`: 全ユーザーの一覧取得
- `POST /users`: 新規ユーザー作成
- `DELETE /users/{id}`: ユーザー削除

---

## 🐳 Docker 構成
本番環境を想定した **マルチステージビルド** を採用しています。
1. **ビルドステージ**: Maven で実行可能な JAR を生成。
2. **実行ステージ**: JRE 17 Alpine をベースに、セキュリティを考慮した最小限の構成で実行。

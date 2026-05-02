# フルスタック Task 管理システム (Spring Boot + React + PostgreSQL)

本プロジェクトは、モダンな技術スタック（Java Spring Boot & React）を使用して構築された、マルチユーザー対応の高度なタスク管理システムです。  
単なる CRUD アプリケーションではなく、データ分離、セキュリティ、レスポンシブなダッシュボードなど、実用性を重視した設計になっています。

---

## 🌟 主な特徴 (Key Features)

### 1. ユーザー別データ分離 (Data Isolation)
- ログインユーザーごとにタスクを完全に分離。ユーザー A は自分自身のタスクのみを閲覧・管理可能です。
- セキュリティコンテキストを活用し、サーバーサイドで厳格にアクセスを制限しています。

### 2. 高度なダッシュボード (Interactive Dashboard)
- **統計カード**: 全タスク数、完了済み、保留中、高優先度タスクをリアルタイムでカウント。
- **目標達成率**: 全体の進捗状況をプログレスサークルで視覚的に表示。
- **インタラクティブ・フィルタリング**: 統計カードをクリックすることで、該当するタスクを即座に一覧表示。

### 3. スケジュール管理 (Upcoming 7-Day Schedule)
- 直近 7 日以内のタスクを自動抽出して表示。
- 期日（Due Date）および優先度（Priority）に基づいた動的なソート機能を搭載。

### 4. セキュリティと権限管理 (Security & Roles)
- **Spring Security**: セッションベースの認証を実装。
- **パスワード暗号化**: BCrypt を使用してデータベース上のパスワードを安全に管理。
- **ロールベースアクセス制御**: ADMIN（ユーザー管理権限あり）と USER の権限を分離。

---

## 🚀 使用技術スタック (Tech Stack)

### バックエンド
- **Java 17** / **Spring Boot 3.4.3**
- **Spring Security**: 認証・認可
- **Spring Data JPA**: データベースアクセス (PostgreSQL)
- **SpringDoc OpenAPI (Swagger)**: API ドキュメントの自動生成

### フロントエンド
- **React 19** / **Vite**
- **TypeScript**: 型安全な開発
- **Ant Design (antd)**: 洗練された UI コンポーネント
- **Axios**: API 通信
- **Day.js**: 日付操作

### インフラ・その他
- **Docker / Docker Compose**: コンテナ化による環境構築の簡素化
- **Nginx**: フロントエンドの配信およびリバースプロキシのシミュレーション

---

## 🛠️ クイックスタート (Docker 使用)

前提条件: [Docker Desktop](https://www.docker.com/products/docker-desktop) がインストールされていること。

1.  リポジトリをクローンまたはダウンロードします。
2.  プロジェクトのルートディレクトリで以下のコマンドを実行します。
    ```bash
    docker-compose up --build
    ```
3.  起動完了後、ブラウザで以下の URL にアクセスしてください。
    - **Frontend (UI)**: [http://localhost](http://localhost)
    - **API Swagger**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 📊 データベース設計 (Database Schema)

### `users` テーブル
| カラム名 | 型 | 説明 |
| :--- | :--- | :--- |
| id | Long (PK) | ユーザー ID |
| name | String | 表示名 |
| email | String (Unique) | ログイン用メールアドレス |
| password | String | 暗号化されたパスワード |
| role | String | 役割 (ADMIN/USER) |

### `todos` テーブル
| カラム名 | 型 | 説明 |
| :--- | :--- | :--- |
| id | Long (PK) | タスク ID |
| title | String | タスク名 |
| description | String | 詳細説明 |
| priority | String | 優先度 (HIGH/MEDIUM/LOW) |
| due_date | String | 完了期限 |
| username | String | 所有者の email |
| is_completed | Boolean | 完了ステータス |

---

## 👨‍💻 著者 (Author)
- **Tam (Adam Tam)** - [GitHub Profile](https://github.com/adamtam321)

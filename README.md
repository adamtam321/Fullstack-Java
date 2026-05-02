# フルスタック Task 管理システム (Spring Boot + React + PostgreSQL)

本プロジェクトは、モダンな技術スタック（Java Spring Boot & React）を使用して構築された、マルチユーザー対応の高度なタスク管理システムです。  
単なる CRUD アプリケーションではなく、データ分離、セキュリティ、レスポンシブなダッシュボードなど、実用性を重視した設計になっています。

---

## 🌟 主な特徴 (Key Features)

### 1. ユーザー別データ分離 (Data Isolation)
- ログインユーザーごとにタスクを完全に分離。ユーザー A は自分自身のタスクのみを閲覧・管理可能です。
- セキュリティコンテキストを活用し、サーバーサイドで厳格にアクセスを制限しています。

### 2. JWT 認証 (Stateless Authentication)
- **JSON Web Token (JWT)** を採用。
- セッションに依存しないステートレスな認証により、クロスドメイン環境やクラウド環境（Render 等）でも安定した動作を実現。
- `Authorization: Bearer <Token>` ヘッダーによるセキュアな API 通信。

### 3. 高度なダッシュボード (Interactive Dashboard)
- **統計カード**: 全タスク数、完了済み、保留中、高優先度タスクをリアルタイムでカウント。
- **目標達成率**: 全体の進捗状況をプログレスサークルで視覚的に表示。
- **インタラクティブ・フィルタリング**: 統計カードをクリックすることで、該当するタスクを即座に一覧表示。

### 4. スケジュール管理 (Upcoming 7-Day Schedule)
- 直近 7 日以内のタスクを自動抽出して表示。
- 期日（Due Date）および優先度（Priority）に基づいた動的なソート機能を搭載。

---

## 🚀 使用技術スタック (Tech Stack)

### バックエンド
- **Java 17** / **Spring Boot 3.4.3**
- **Spring Security**: JWT フィルターによるステートレス認証
- **JJWT**: JWT トークンの生成・検証
- **Spring Data JPA**: データベースアクセス (PostgreSQL)

### フロントエンド
- **React 19** / **Vite** / **TypeScript**
- **Ant Design (antd)**: 洗練された UI コンポーネント
- **Axios**: JWT インターセプターを実装した API 通信

---

## 🛠️ クイックスタート (Docker 使用)

1.  リポジトリをクローンまたはダウンロードします。
2.  プロジェクトのルートディレクトリで以下のコマンドを実行します。
    ```bash
    docker-compose up --build
    ```
3.  起動完了後、ブラウザで以下の URL にアクセスしてください。
    - **Frontend (UI)**: [http://localhost](http://localhost)
    - **Default Admin**: `admin@gmail.com` / `password`

---

## 👨‍💻 著者 (Author)
- **Tam (Adam Tam)** - [GitHub Profile](https://github.com/adamtam321)

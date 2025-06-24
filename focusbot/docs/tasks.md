## 実装手順・タスク管理

- [x] 環境構築
  - [x] .env.local にAPIキーを設定
  - [x] Nodeインストール
  - [x] firebase openai axiosインストール
- [x] Firebase & OpenAI 接続
  - [x] Firebaseプロジェクト作成
  - [x] lib/firebase.ts を作成　AuthとFirestoreを初期化
- [x] OpenAI APIとの連携
  - [x] lib/openai.ts を作成
  - [x] /app/api/gpt/route.ts でOpenAI APIと接続
- [ ] 画面構成とページ作成
  - [x] /app/planner/page.tsx（フォーム＆結果）
  - [ ] plannerフォームの入力バリデーションを追加
- [ ] Firestoreとの接続
  - [ ] 学習プランをFirestoreに保存（ユーザー単位）
- [ ] UI設計とタスク管理
  - [ ] /dashboard：今日の学習タスク表示
  - [ ] Firestoreから「今日の学習タスク」を取得（dashboard向け）
  - [ ] /tasks：タスク達成記録ページ
- [ ] UIの共通化と整備
  - [ ] ナビゲーションバーなど共通レイアウト app/layout.tsx に追加
  - [ ] components/ 以下に UI パーツを分割して管理
  - [ ] 軽量な状態管理導入（useContext, zustand など）
- [ ] UX強化と微調整
  - [ ] ローディングスピナーの導入（AI応答中に表示）
  - [ ] Firebase Authentication（Email or 匿名）導入でユーザーごとにプラン管理
  - [ ] モバイル対応（Tailwindでレスポンシブ設計）
  - [ ] UIの共通レイアウトと状態管理を追加
  - [ ] 各ページに `<head>` タグでタイトルやメタ情報設定

実装優先順位
1. Firebase & OpenAI 接続（lib/firebase.ts, lib/openai.ts）
2. /planner フォームを作って → /api/gpt に連携して結果表示
3. 結果をFirestoreに保存
4. dashboardとtasks画面でFirestoreを使って表示・記録
5. UIパーツ分離、ナビバーなど共通整備
6. UX（認証、スピナー、レスポンシブ）を最後に強化

> 2025.6.22

1. Github上にリモートリポジトリ作成
2. README.md作成
3. VScode起動後Clone
   ```
   git clone https://github.com/kana-coco/FocusBot-AI.git
   git add .
   git commit -m "ADD/UPDATE/FIX/REMOVE"
   git push (git push -u origin main)
   ```
4. next.jsのプロジェクトを作成　```npx create-next-app ```
```
# Next.js（TypeScript＋App Router構成）でプロジェクト作成
npx create-next-app@latest focusbot --typescript --app --tailwind --eslint
```
1. フォルダ構成に従って、必要なフォルダ、ファイルを作成
```
focusbot/
├── app/                    # App Router構成のルーティングフォルダ
│   ├── page.tsx           # ホームページ（トップ）
│   ├── layout.tsx         # 全体レイアウト
│   └── globals.css        # 全体CSS（Tailwind適用）
├── public/                # 静的ファイル（画像など）
├── styles/                # スタイルシート（任意で使う）
├── lib/                   # APIユーティリティやFirebase設定など
├── components/            # 再利用可能なUIコンポーネント群
├── app/api/               # API Routes（バックエンド処理）
├── .env.local             # 環境変数（自分で作成）
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```
```
focusbot/
├── app/
│   ├── planner/           # AIでプラン作成する画面
│   ├── dashboard/         # 今日のタスク一覧
│   ├── tasks/             # タスク操作画面
│   ├── history/           # 実績・振り返り画面
│   ├── settings/          # ユーザー設定画面
│   └── api/
│       ├── gpt/           # GPT API連携ルート
│       └── task/          # タスク管理用API
├── lib/
│   ├── firebase.ts        # Firebase初期化とエクスポート
│   └── openai.ts          # OpenAI APIラッパー（後述）
├── components/
│   ├── UI/                # Button, Card, Modal など
│   ├── TaskList.tsx       # タスクリスト用コンポーネント
│   └── Layout.tsx         # 全体レイアウトコンポーネント
```
```
focusbot/
├── public/                         # 公開静的ファイル（画像など）
├── src/
│   ├── app/
│   │   ├── layout.tsx             # 共通レイアウト
│   │   ├── page.tsx               # ホーム画面
│   │   └── planner/               # 学習プラン画面
│   │       └── page.tsx
│   ├── components/                # UIパーツ
│   │   └── PlannerForm.tsx
│   ├── lib/
│   │   ├── firebase.ts            # Firebase初期化
│   │   └── openai.ts              # OpenAIラッパー
│   └── styles/                    # Tailwind等
├── .env.local                     # APIキーなど（git管理外）
├── package.json
└── README.md
```
1. 開発サーバーが立ち上がるか確認  
```npm run dev```

> 2025.6.23
1. features.md、issue_logs.mdを作成
2. 今後の実装手順整理
- [ ] 環境構築
  - [ ] .env.local にAPIキーを設定
  - [x] Nodeインストール
  - [ ] firebase openai axiosインストール
- [ ] Firebase & OpenAI 接続
  - [ ] Firebaseプロジェクト作成
  - [ ] lib/firebase.ts を作成　AuthとFirestoreを初期化
- [ ] OpenAI APIとの連携
  - [ ] lib/openai.ts を作成
  - [ ] /app/api/gpt/route.ts でOpenAI APIと接続
- [ ] 画面構成とページ作成
  - [ ] /app/planner/page.tsx（フォーム＆結果）
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

>2025.6.24
1. .env.local にAPIキーを設定

.env.localファイルを作成し、FirebaseとOpenAIのキーを記述
OpenAIのキーは公式HPより自アカウントで作成

2. firebase openai axiosインストール

```
npm install firebase openai axios
```
実行後package.jsonにそれぞれ追加されていることを確認

3. Firebaseプロジェクト作成

Next.jsアプリとFirebaseを接続するために、まずは Firebaseプロジェクトを作成し、必要な機能（Firestore、Authentication）を有効化する
https://console.firebase.google.com/
- 上記URLでFirebaseプロジェクトの作成　プロジェクト名：FocusBot  
- ウェブアプリ作成  
- Firestore Databaseでデータベース作成  
- Authenticationを匿名ログイン/メールパスワードで設定

4. lib/firebase.ts を作成
Next.jsアプリから FirebaseのFirestoreとAuth機能を使えるように、
SDKを初期化しておきます。  
これにより、どのコンポーネント・API Routeからでも db や auth を import して使えるようになります。

実装ファイル：lib/firebase.ts

5. lib/openai.ts を作成  
OpenAIへのプロンプト生成とAPI通信が必要です。  
この処理をまとめて lib/openai.ts に定義します。

ChatGPT APIは 会話形式 を前提にしており、system でAIの振る舞いを指示し、  
user で質問内容を渡すのがベストプラクティス  
temperature を調整することでアイデアの多様性 or 論理性のバランスを制御できる

6. /app/api/gpt/route.ts でOpenAI APIと接続

フロントエンドから直接OpenAI APIを叩くのではなく、  
Next.jsのAPI Routeを仲介して安全にリクエストを送るためのエンドポイントを構築する

## 実装の際に詰まった箇所
- マークダウン記法のチェックボックスがVScodeのプレビュー画面で反映されない。  
=> 拡張機能「Markdown All In One」インストール後プレビュー画面に反映

- ディレクトリ構成  
=> ChatGPTにおすすめされた以下のフォルダ構成で開発開始。適宜フォルダ構成を修正していく。
```focusbot/
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
└── README.md```
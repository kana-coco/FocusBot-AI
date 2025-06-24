## Tips集

> .env.localがなぜ必要か

機密情報や外部サービスのキー（FirebaseやOpenAIなど）をソースコードに直接書かず、.env.local にまとめて管理するのがセキュリティ上・開発効率上のベストプラクティス  
※ GitHubなどにファイルを公開しないように注意  
本番環境と開発環境でキーを切り替えられることもメリット

> .env.local > NEXT_PUBLIC_ の意味

Next.js では .env.local に書かれた環境変数のうち、NEXT_PUBLIC_ をつけた変数だけがブラウザ側からアクセス可能になる。
NEXT_PUBLIC_〜 → フロントエンドでも使える

それ以外（例：OPENAI_API_KEY） → サーバー側だけ（API Routes内など）

🔒 OpenAIのAPIキーは絶対にフロントから直接使ってはいけません。API経由で使うようにします。

> firebaseをなぜ採用するか

→ Google提供のBaaS
Firestore → 学習プランやタスクの保存・取得
Authentication → ユーザーごとのデータ管理
今回の「ユーザー別に学習プランを保存・取得する」要件に必須。
FirestoreはNoSQLなので、構造の自由度が高く、ユーザーごとに学習プランやタスクを柔軟に管理できる

> axiosをなぜ採用するか
→ HTTPクライアント（fetchのラッパー）

フォームからAPIルートへのリクエスト送信に使う
シンプルな構文、レスポンス型整備、タイムアウト設定などが便利
POSTリクエストやAPIエラー処理がとても簡潔に書ける。

> process.env.NEXT_PUBLIC_...! の 「!」 はなぜ必要？
lib/firebase.ts
TypeScriptで「環境変数は必ずあるよ」と明示するための Non-null assertion
.env.local に値が入っていないとビルド時にエラーになるので、安全性向上にも役立つ
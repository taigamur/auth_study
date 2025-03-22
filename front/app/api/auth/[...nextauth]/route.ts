// google oidc 用の処理

import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;

/*

auth.tsからhandersをimport
handlersからGET, POSTのリクエストを処理する関数をエクスポート
-> ハンドラを外部から読み込んで、エンドポンととして提供するだけ

ここで直接 NextAuth() を呼び出すと、Edge対応が不安定になる場合がある

*/

/*

[...nextauth] はNext.jsの動的キャッチオールルートを意味するファイル名
route.ts に NextAuth() を設定すると、以下のエンドポイントを自動的に処理するようになる。
/api/auth/signin	ログイン（GoogleやGitHubなどのOAuth認証）
/api/auth/signout	ログアウト処理
/api/auth/session	セッション情報取得
/api/auth/callback/google	GoogleのOIDC認証後のコールバック
/api/auth/callback/github	GitHub認証後のコールバック


*/

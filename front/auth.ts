import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// セッション型の拡張
declare module "next-auth" {
	interface Session {
		accessToken?: string;
		idToken?: string;
		user: {
			id?: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}
}

// NextAuthの設定
export const authConfig: NextAuthConfig = {
	// 認証プロバイダーの設定
	providers: [Google],

	// コールバック関数の設定
	callbacks: {
		// ページアクセス時の認証チェック
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			// 保護されたページのパスを定義
			const isOnProtectedPage =
				nextUrl.pathname.startsWith("/protected") ||
				nextUrl.pathname.startsWith("/oidc2/protected");

			if (isOnProtectedPage) {
				// 保護されたページにアクセスする場合
				if (isLoggedIn) {
					// ログイン済みならアクセス許可
					return true;
				}
				// 未ログインならエラーページにリダイレクト
				return Response.redirect(
					new URL("/oidc2/error?error=sessionrequired", nextUrl.origin),
				);
			}
			// 保護されていないページは誰でもアクセス可能
			return true;
		},

		// JWTコールバック - トークン情報の処理
		async jwt({ token, account }) {
			// 初回サインイン時にアクセストークンを保存
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},

		// セッションコールバック - クライアント側に渡すセッション情報の設定
		async session({ session, token }) {
			// JWTからセッションにアクセストークンを追加
			if (token && typeof token === "object" && "accessToken" in token) {
				session.accessToken = token.accessToken as string;
			}
			return session;
		},
	},

	// カスタムページの設定
	pages: {
		// サインインページのカスタマイズ
		signIn: "/oidc2",
		// エラーページのカスタマイズ
		error: "/oidc2/error",
	},
};
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

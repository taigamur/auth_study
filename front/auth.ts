import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

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

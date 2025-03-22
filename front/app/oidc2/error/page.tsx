"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// エラーメッセージの日本語化
const errorMessages: Record<string, string> = {
	default: "認証中にエラーが発生しました。",
	configuration:
		"認証の設定に問題があります。システム管理者にお問い合わせください。",
	accessdenied:
		"アクセスが拒否されました。権限がないか、認証が拒否されました。",
	verification: "メールアドレスの確認ができませんでした。",
	signin: "サインインに失敗しました。もう一度お試しください。",
	oauthsignin: "OAuthプロバイダーでのサインインに失敗しました。",
	oauthcallback: "OAuthコールバックの処理中にエラーが発生しました。",
	oauthcreateaccount: "OAuthアカウントの作成に失敗しました。",
	emailcreateaccount: "メールアカウントの作成に失敗しました。",
	callback: "コールバック処理中にエラーが発生しました。",
	oauthaccountnotlinked: "このアカウントは既に別の認証方法で登録されています。",
	emailsignin: "メールリンクの送信に失敗しました。",
	credentialssignin: "サインイン情報が正しくありません。",
	sessionrequired: "このページにアクセスするにはログインが必要です。",
};

export default function ErrorPage() {
	const searchParams = useSearchParams();
	const [error, setError] = useState<string>("default");

	useEffect(() => {
		// URLからエラーコードを取得
		const errorCode = searchParams.get("error") || "default";
		setError(errorCode);
	}, [searchParams]);

	return (
		<div
			style={{
				textAlign: "center",
				marginTop: "50px",
				padding: "20px",
				maxWidth: "600px",
				margin: "50px auto",
			}}
		>
			<div
				style={{
					backgroundColor: "#ffebee",
					border: "1px solid #ffcdd2",
					borderRadius: "8px",
					padding: "20px",
					marginBottom: "30px",
				}}
			>
				<h1 style={{ color: "#d32f2f", marginBottom: "20px" }}>認証エラー</h1>
				<p style={{ fontSize: "18px", marginBottom: "20px" }}>
					{errorMessages[error] || errorMessages.default}
				</p>
				<p style={{ fontSize: "14px", color: "#666" }}>エラーコード: {error}</p>
			</div>

			<div>
				<Link
					href="/oidc2"
					style={{
						padding: "10px 20px",
						backgroundColor: "#4285F4",
						color: "white",
						borderRadius: "4px",
						textDecoration: "none",
						display: "inline-block",
					}}
				>
					ログインページに戻る
				</Link>
			</div>
		</div>
	);
}

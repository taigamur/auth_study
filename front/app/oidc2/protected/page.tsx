"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, Button, CircularProgress } from "@mui/material";
import { useState } from "react";

// APIのベースURL
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// バックエンドAPIのレスポンス型
interface BackendResponse {
	message: string;
	user: {
		[key: string]: unknown;
	};
}

export default function ProtectedPage() {
	const { data: session, status } = useSession();
	const [backendResponse, setBackendResponse] =
		useState<BackendResponse | null>(null);
	const [backendError, setBackendError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// バックエンドAPIにトークンを送信する関数
	const verifyTokenWithBackend = async () => {
		if (!session) return;

		setIsLoading(true);
		setBackendError(null);

		try {
			// セッションからアクセストークンを取得
			const accessToken = session.accessToken;

			if (!accessToken) {
				setBackendError("アクセストークンが見つかりません");
				setIsLoading(false);
				return;
			}

			// バックエンドAPIにリクエスト
			const response = await fetch(`${API_BASE_URL}/google_oidc_protected`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.detail || "バックエンドAPIでエラーが発生しました",
				);
			}

			const data = await response.json();
			setBackendResponse(data);
		} catch (error) {
			console.error("バックエンドAPI呼び出しエラー:", error);
			setBackendError(
				error instanceof Error ? error.message : "不明なエラーが発生しました",
			);
		} finally {
			setIsLoading(false);
		}
	};

	// ローディング中の表示
	if (status === "loading") {
		return (
			<div style={{ textAlign: "center", marginTop: "50px" }}>
				<h1>読み込み中...</h1>
				<CircularProgress />
			</div>
		);
	}

	// 未認証の場合はエラーページにリダイレクト
	if (status === "unauthenticated") {
		redirect("/oidc2/error?error=sessionrequired");
	}

	// 認証済みの場合は保護されたコンテンツを表示
	return (
		<div style={{ textAlign: "center", marginTop: "50px", padding: "0 20px" }}>
			<h1>保護されたページ</h1>
			<p>このページは認証済みユーザーのみがアクセスできます。</p>

			{session?.user && (
				<div
					style={{
						margin: "20px auto",
						padding: "20px",
						maxWidth: "500px",
						border: "1px solid #ddd",
						borderRadius: "8px",
						backgroundColor: "#f9f9f9",
					}}
				>
					<h2>ユーザー情報</h2>
					<p>
						<strong>名前:</strong> {session.user.name || "未設定"}
					</p>
					<p>
						<strong>メール:</strong> {session.user.email || "未設定"}
					</p>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "10px",
						}}
					>
						<Avatar
							alt="プロフィール画像"
							src={session.user.image || "https://via.placeholder.com/100"}
							sx={{ width: 100, height: 100 }}
						/>
					</div>
				</div>
			)}

			<div style={{ marginTop: "30px", marginBottom: "30px" }}>
				<Button
					variant="contained"
					color="primary"
					onClick={verifyTokenWithBackend}
					disabled={isLoading}
					style={{ marginRight: "10px" }}
				>
					{isLoading ? (
						<>
							<CircularProgress
								size={24}
								color="inherit"
								style={{ marginRight: "10px" }}
							/>
							バックエンドで検証中...
						</>
					) : (
						"バックエンドでトークンを検証"
					)}
				</Button>

				<Link
					href="/oidc2"
					style={{
						padding: "10px 20px",
						backgroundColor: "#4285F4",
						color: "white",
						borderRadius: "4px",
						textDecoration: "none",
						marginLeft: "10px",
					}}
				>
					ホームに戻る
				</Link>
				<Link
					href="/"
					style={{
						padding: "10px 20px",
						backgroundColor: "#34A853",
						color: "white",
						borderRadius: "4px",
						textDecoration: "none",
						marginLeft: "10px",
					}}
				>
					TOPページへ戻る
				</Link>
			</div>

			{/* バックエンドAPIのレスポンス表示 */}
			{backendResponse && (
				<div
					style={{
						margin: "20px auto",
						padding: "20px",
						maxWidth: "600px",
						border: "1px solid #4CAF50",
						borderRadius: "8px",
						backgroundColor: "#E8F5E9",
					}}
				>
					<h2>バックエンド検証結果</h2>
					<p>
						<strong>メッセージ:</strong> {backendResponse.message}
					</p>
					<div style={{ textAlign: "left", marginTop: "10px" }}>
						{/* <h3>ユーザー情報 (トークンから):</h3>
						<pre
							style={{
								backgroundColor: "#f5f5f5",
								padding: "10px",
								borderRadius: "4px",
								overflow: "auto",
								maxHeight: "300px",
							}}
						>
							{JSON.stringify(backendResponse.user, null, 2)}
						</pre> */}
					</div>
				</div>
			)}

			{/* エラーメッセージ表示 */}
			{backendError && (
				<div
					style={{
						margin: "20px auto",
						padding: "20px",
						maxWidth: "600px",
						border: "1px solid #f44336",
						borderRadius: "8px",
						backgroundColor: "#FFEBEE",
						color: "#D32F2F",
					}}
				>
					<h2>エラー</h2>
					<p>{backendError}</p>
				</div>
			)}
		</div>
	);
}

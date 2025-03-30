"use client";

import { useAuth0 } from "@auth0/auth0-react";
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
	const {
		user,
		isAuthenticated,
		isLoading: authLoading,
		getAccessTokenSilently,
	} = useAuth0();
	const [backendResponse, setBackendResponse] =
		useState<BackendResponse | null>(null);
	const [backendError, setBackendError] = useState<string | null>(null);
	const [isVerifying, setIsVerifying] = useState<boolean>(false);

	// バックエンドAPIにトークンを送信する関数
	const verifyTokenWithBackend = async () => {
		if (!isAuthenticated) return;

		setIsVerifying(true);
		setBackendError(null);

		try {
			// Auth0からアクセストークンを取得
			const accessToken = await getAccessTokenSilently();

			if (!accessToken) {
				setBackendError("アクセストークンが見つかりません");
				setIsVerifying(false);
				return;
			}

			// バックエンドAPIにリクエスト
			const response = await fetch(`${API_BASE_URL}/oidc_protected`, {
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
			setIsVerifying(false);
		}
	};

	// ローディング中の表示
	if (authLoading) {
		return (
			<div style={{ textAlign: "center", marginTop: "50px" }}>
				<h1>読み込み中...</h1>
				<CircularProgress />
			</div>
		);
	}

	// 未認証の場合はエラーページにリダイレクト
	if (!isAuthenticated) {
		redirect("/oidc/error?error=sessionrequired");
	}

	// 認証済みの場合は保護されたコンテンツを表示
	return (
		<div style={{ textAlign: "center", marginTop: "50px", padding: "0 20px" }}>
			<h1>保護されたページ</h1>
			<p>このページは認証済みユーザーのみがアクセスできます。</p>

			{user && (
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
						<strong>名前:</strong> {user.name || "未設定"}
					</p>
					<p>
						<strong>メール:</strong> {user.email || "未設定"}
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
							src={user.picture || "https://via.placeholder.com/100"}
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
					disabled={isVerifying}
					style={{ marginRight: "10px" }}
				>
					{isVerifying ? (
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
					href="/oidc"
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

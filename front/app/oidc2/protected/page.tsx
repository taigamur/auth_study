"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@mui/material";

export default function ProtectedPage() {
	const { data: session, status } = useSession();

	// ローディング中の表示
	if (status === "loading") {
		return (
			<div style={{ textAlign: "center", marginTop: "50px" }}>
				<h1>読み込み中...</h1>
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

			<div style={{ marginTop: "30px" }}>
				<Link
					href="/oidc2"
					style={{
						padding: "10px 20px",
						backgroundColor: "#4285F4",
						color: "white",
						borderRadius: "4px",
						textDecoration: "none",
						marginRight: "10px",
					}}
				>
					ホームに戻る
				</Link>
			</div>
		</div>
	);
}

"use client";

import { Avatar, Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";

export default function Home() {
	const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
		useAuth0();

	return (
		<div style={{ textAlign: "center", marginTop: "50px", padding: "0 20px" }}>
			<h1>Auth0 OIDC 認証</h1>
			<p style={{ marginBottom: "20px" }}>
				Auth0 OIDCを使用した認証の例です。
				<br />
				ログインすると保護されたページにアクセスできます。
			</p>
			<div style={{ marginBottom: "15px" }}>
				<Link
					href="/oidc/protected"
					style={{
						padding: "10px 20px",
						backgroundColor: "#34A853",
						color: "white",
						borderRadius: "4px",
						textDecoration: "none",
						marginRight: "10px",
						display: "inline-block",
					}}
				>
					保護されたページへ (/oidc/protected)
				</Link>
			</div>

			{isLoading ? (
				<p>読み込み中...</p>
			) : isAuthenticated ? (
				<div>
					<div
						style={{
							margin: "20px auto",
							padding: "15px",
							maxWidth: "400px",
							backgroundColor: "#f0f8ff",
							borderRadius: "8px",
							border: "1px solid #ccc",
						}}
					>
						<p>
							ログイン済み: <strong>{user?.name}</strong>
						</p>
						{user?.picture && (
							<Avatar
								alt="プロフィール画像"
								src={user.picture || "https://via.placeholder.com/100"}
								sx={{ width: 100, height: 100, margin: "0 auto" }}
							/>
						)}
					</div>

					<div style={{ marginTop: "20px" }}>
						<button
							type="button"
							onClick={() =>
								logout({
									logoutParams: { returnTo: `${window.location.origin}/oidc` },
								})
							}
							style={{
								padding: "10px 20px",
								backgroundColor: "#EA4335",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
								fontSize: "16px",
							}}
						>
							ログアウト
						</button>
					</div>
				</div>
			) : (
				<Box sx={{ mt: 3 }}>
					<button
						type="button"
						onClick={() => loginWithRedirect()}
						style={{
							padding: "12px 24px",
							backgroundColor: "#4285F4",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
							fontSize: "16px",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						Auth0でログイン
					</button>
				</Box>
			)}
		</div>
	);
}

"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { Box } from "@mui/material";

const Provider = ({ children }: { children: React.ReactNode }) => {
	if (
		!process.env.NEXT_PUBLIC_AUTH0_DOMAIN &&
		!process.env.NEXT_PUBLIC_CLIENT_ID
	) {
		return <></>;
	}

	if (
		!process.env.NEXT_PUBLIC_AUTH0_DOMAIN &&
		!process.env.NEXT_PUBLIC_CLIENT_ID
	)
		return (
			<Box sx={{ height: 30, background: "red" }}>
				認証情報が適切に設定されていません
			</Box>
		);

	return (
		<Auth0Provider
			domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
			clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}
			authorizationParams={{
				audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
				redirect_uri:
					typeof window !== "undefined" ? `${window.location.origin}/oidc` : "",
			}}
		>
			{children}
		</Auth0Provider>
	);
};

export default Provider;

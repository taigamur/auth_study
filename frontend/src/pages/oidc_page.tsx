import { CircularProgress, Container } from "@mui/material";
import { Header } from "../components/features/oidc/header";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/features/oidc/login_button";
import LogoutButton from "../components/features/oidc/logout_button";
import { Explain } from "../components/features/oidc/explain";
import { Message } from "../components/features/oidc/message";

export const OidcPage = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	return (
		<>
			<Header user={user} />
			<Container
				component="main"
				maxWidth="md"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 12,
					flexDirection: "column", // 縦方向に配置
				}}
			>
				{isLoading ? (
					<CircularProgress />
				) : isAuthenticated ? (
					<LogoutButton />
				) : (
					<LoginButton />
				)}
				<Explain />
				<Message user={user} />
			</Container>
		</>
	);
};

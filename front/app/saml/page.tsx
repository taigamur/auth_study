import { useAuth0 } from "@auth0/auth0-react";
import { Box, CircularProgress, Container } from "@mui/material";
import { Explain } from "../components/features/oidc/explain";
import { Header } from "./components'header";
import { LoginButton } from "../components/features/oidc/login_button";
import LogoutButton from "../components/features/oidc/logout_button";
import { Message } from "../components/features/oidc/message";

export const OidcPage = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	return (
		<>
			<Header user={user} />
			<Container
			// 	component="main"
			// 	maxWidth="md"
			// 	sx={{
			// 		display: "flex",
			// 		alignItems: "center",
			// 		justifyContent: "center",
			// 		marginTop: 12,
			// 		flexDirection: "column", // 縦方向に配置
			// 	}}
			// >
			// 	<Explain />
			// 	<Box sx={{ mt: 5 }}>
			// 		{isLoading ? (
			// 			<CircularProgress />
			// 		) : isAuthenticated ? (
			// 			<LogoutButton />
			// 		) : (
			// 			<LoginButton />
			// 		)}
			// 	</Box>

			// 	<Message user={user} />
			</Container>
		</>
	);
};

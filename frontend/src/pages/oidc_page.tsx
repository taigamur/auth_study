import { CircularProgress, Container } from "@mui/material";
import { Header } from "../components/features/oidc/header";
import { useAuth0, type GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { LoginButton } from "../components/features/oidc/login_button";
import LogoutButton from "../components/features/oidc/logout_button";
import { Explain } from "../components/features/oidc/explain";
import { Message } from "../components/features/oidc/message";

export const OidcPage = () => {
	// const { getAccessTokenSilently } = useAuth0();
	// const fetchProtectedData = async () => {
	// 	console.log("fetchProtectedData");
	// 	const token = await getAccessTokenSilently({
	// 		audience: "https://auth_study.local/",
	// 	} as GetTokenSilentlyOptions);

	// 	const response = await fetch("http://localhost:8000/oidc_protected", {
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	});

	// 	const data = await response.json();
	// 	console.log(data);
	// };

	// fetchProtectedData();

	const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
		useAuth0();

	getAccessTokenSilently({
		audience: "https://auth_study.local/",
	} as GetTokenSilentlyOptions)
		.then((token) => console.log(token))
		.catch((e) => {
			console.log(`error: ${e}`);
		});

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
				<Message />
			</Container>
		</>
	);
};

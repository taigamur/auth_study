import { CircularProgress, Container, Icon } from "@mui/material";
import { Header } from "../components/features/oidc/header";
import { useAuth0, type GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { LoginButton } from "../components/features/oidc/login_button";
import LogoutButton from "../components/features/oidc/logout_button";

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

	console.log(`user: ${user ? Object.keys(user) : "undefined"}`);
	console.log(user?.given_name);
	console.log(user?.email);
	console.log(user?.email_verified);
	console.log(`authenticated: ${isAuthenticated}`);
	console.log(isLoading);

	getAccessTokenSilently({
		audience: "https://auth_study.local/",
	} as GetTokenSilentlyOptions)
		.then((token) => console.log(token))
		.catch((e) => {
			console.log(`error: ${e}`);
		});

	return (
		<>
			<Header email={user?.email} />
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
			</Container>
		</>
	);
};

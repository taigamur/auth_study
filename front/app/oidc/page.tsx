"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Box, CircularProgress, Container } from "@mui/material";

import { Header } from "./components/header";
import { Explain } from "./components/explain";
import { Message } from "./components/message";
import Logout from "./components/logout";
import { Login } from "./components/login";

const Page = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	console.log(`User: ${user}`);

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
				<Explain />
				<Box sx={{ mt: 5 }}>
					{isLoading ? (
						<CircularProgress />
					) : isAuthenticated ? (
						<Logout />
					) : (
						<Login />
					)}
				</Box>

				<Message user={user} />
			</Container>
		</>
	);
};

export default Page;

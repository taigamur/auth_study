"use client";

import {
	AppBar,
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	Container,
	Divider,
	Grid,
	Toolbar,
	Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import KeyIcon from "@mui/icons-material/Key";

const HomePage = () => {
	return (
		<>
			<AppBar position="static" color="transparent" elevation={0}>
				<Toolbar>
					<Button
						color="inherit"
						href="https://github.com/taigamur/auth_study"
						target="_blank"
						startIcon={<GitHubIcon />}
					>
						GitHub
					</Button>
				</Toolbar>
			</AppBar>

			<Container maxWidth="md">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mt: 8,
						mb: 6,
					}}
				>
					<Typography
						variant="h4"
						component="h1"
						gutterBottom
						align="center"
						sx={{ fontWeight: 600 }}
					>
						認証のサンプル実装
					</Typography>
				</Box>

				<Grid container spacing={4} sx={{ mb: 8 }}>
					<Grid item xs={12} md={4}>
						<Card
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								transition: "transform 0.2s",
								"&:hover": {
									transform: "translateY(-4px)",
									boxShadow: 4,
								},
							}}
						>
							<CardActionArea component="a" href="oidc">
								<Box
									sx={{
										height: 140,
										bgcolor: "primary.light",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<LockIcon sx={{ fontSize: 60, color: "white" }} />
								</Box>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography gutterBottom variant="h5" component="h2">
										OIDC認証（Auth0）
									</Typography>
									<Typography>
										Auth0を使用したOIDC認証の実装例です。シングルサインオンやソーシャルログインの機能を提供します。
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								transition: "transform 0.2s",
								"&:hover": {
									transform: "translateY(-4px)",
									boxShadow: 4,
								},
							}}
						>
							<CardActionArea component="a" href="oidc2">
								<Box
									sx={{
										height: 140,
										bgcolor: "#4285F4",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<GoogleIcon sx={{ fontSize: 60, color: "white" }} />
								</Box>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography gutterBottom variant="h5" component="h2">
										OIDC認証（Google）
									</Typography>
									<Typography>
										Googleを使用したOIDC認証の実装例です。Googleアカウントを使用してログインできます。
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								transition: "transform 0.2s",
								"&:hover": {
									transform: "translateY(-4px)",
									boxShadow: 4,
								},
							}}
						>
							<CardActionArea component="a" href="id_pass">
								<Box
									sx={{
										height: 140,
										bgcolor: "secondary.main",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<KeyIcon sx={{ fontSize: 60, color: "white" }} />
								</Box>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography gutterBottom variant="h5" component="h2">
										ID/PASS認証
									</Typography>
									<Typography>
										従来のID/パスワード認証の実装例です。ユーザー登録、ログイン、ログアウト機能を提供します。
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>

				<Divider sx={{ mb: 4 }} />
			</Container>
		</>
	);
};

export default HomePage;

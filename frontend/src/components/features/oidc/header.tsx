import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";

type HeaderProps = {
	email?: string;
};

export const Header = (props: HeaderProps) => {
	const { email } = props;
	return (
		<AppBar component="nav">
			<Toolbar>
				<Typography
					variant="body1"
					component="div"
					sx={{ display: { xs: "none", sm: "block" } }}
				>
					このページはOIDC認証のためのページです
				</Typography>
				<Box sx={{ display: { xs: "none", sm: "flex" }, marginLeft: "auto" }}>
					<Typography
						variant="body1"
						component="div"
						sx={{ display: { xs: "none", sm: "block" } }}
					>
						{email || "ログインしていません"}
					</Typography>
					<Link href="/">
						<Typography
							variant="body1"
							component="div"
							sx={{ display: { xs: "none", sm: "block" } }}
							style={{ marginLeft: 10 }}
							color="white"
						>
							TOPページ
						</Typography>
					</Link>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

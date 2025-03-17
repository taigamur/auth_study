import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../auth_context";

export const Header = () => {
	const { user } = useAuth();

	return (
		<AppBar component="nav">
			<Toolbar>
				<Typography
					variant="body1"
					component="div"
					sx={{ display: { xs: "none", sm: "block" } }}
				>
					このページはID/PASS認証のためのページです
				</Typography>
				<Box sx={{ display: { xs: "none", sm: "flex" }, marginLeft: "auto" }}>
					<Typography
						variant="body1"
						component="div"
						sx={{ display: { xs: "none", sm: "block" } }}
					>
						{user ? user.name : "ログインしていません"}
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

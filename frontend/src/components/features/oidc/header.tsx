import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import type { User } from "./type";

type HeaderProps = {
	user?: User;
};

export const Header = (props: HeaderProps) => {
	const { user } = props;
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
						{user ? user.email : "ログインしていません"}
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

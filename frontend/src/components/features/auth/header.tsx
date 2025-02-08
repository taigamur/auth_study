import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../../context/auth_context";

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
				<Box sx={{ display: { xs: "none", sm: "block" }, marginLeft: "auto" }}>
					<Typography
						variant="body1"
						component="div"
						sx={{ display: { xs: "none", sm: "block" } }}
					>
						{user ? user.name : "ログインしていません"}
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

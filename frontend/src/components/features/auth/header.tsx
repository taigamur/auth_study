import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../../context/auth_context";

export const Header = () => {
	const { user } = useAuth();

	console.log(user);

	const navItems = ["A", "B"];

	// const handleDrawerToggle = () => {};
	return (
		<AppBar component="nav">
			<Toolbar>
				<Typography
					variant="body1"
					component="div"
					sx={{ display: { xs: "none", sm: "block" } }}
				>
					{user ? user.name : "ログインしていません"}
				</Typography>
				<Box sx={{ display: { xs: "none", sm: "block" }, marginLeft: "auto" }}>
					{navItems.map((item) => (
						<Button key={item} sx={{ color: "#fff" }}>
							{item}
						</Button>
					))}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

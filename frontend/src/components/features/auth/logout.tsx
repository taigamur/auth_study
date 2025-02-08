import { Button } from "@mui/material";
import { useAuth } from "../../../context/auth_context";

export const Logout = () => {
	const { logout } = useAuth();
	const handleLogout = () => {
		logout();
	};
	return (
		<>
			<Button variant="text" onClick={handleLogout}>
				ログアウトする
			</Button>
		</>
	);
};

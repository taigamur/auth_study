import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
	const { logout } = useAuth0();

	return (
		<button
			type="button"
			onClick={() => {
				console.log("clicked");
				logout({
					logoutParams: { returnTo: `${window.location.origin}/oidc` },
				});
			}}
		>
			ログアウト
		</button>
	);
};

export default Logout;

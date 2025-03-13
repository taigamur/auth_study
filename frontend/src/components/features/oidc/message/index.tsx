import { type GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import type { User } from "../type";

export type MessageProps = {
	user?: User;
};

export const Message = (props: MessageProps) => {
	const { user } = props;

	const { getAccessTokenSilently } = useAuth0();

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const fetchProtectedData = async () => {
		setLoading(true);
		setMessage("");
		try {
			const token = await getAccessTokenSilently({
				audience: "https://auth_study.local/",
			} as GetTokenSilentlyOptions);

			if (!token) throw new Error("Failed to retrieve access token");

			const response = await axios.get(
				`${import.meta.env.VITE_APP_API_BASE_URL}/oidc_protected`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);
			console.log(response);
			setMessage(`サーバー側での検証に成功：${response.data.message}`);
		} catch (error) {
			console.error(error);
			setMessage("サーバー側での検証に失敗");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div style={{ marginTop: 30, textAlign: "center" }}>
				<Button onClick={fetchProtectedData}>
					{loading ? <CircularProgress /> : "サーバーでリクエストを検証する"}
				</Button>
				<div>{message}</div>
			</div>
		</>
	);
};

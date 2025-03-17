"use client";

import { Box, Link } from "@mui/material";
import styled from "styled-components";

const LinkWrapper = styled.div`
  border: 1px solid black;
  width: 600px;
  margin: 32px auto;
  padding: 16px 0px;
`;

const HomePage = () => {
	return (
		<>
			<Box sx={{ textAlign: "center", m: 10 }}>
				各認証方法のサンプル実装
				<div style={{ marginTop: 20 }}>
					<Link
						href="https://github.com/taigamur/auth_study"
						underline="none"
						target="_blank"
					>
						GitHub（taigamur/auth_study）
					</Link>
				</div>
				<LinkWrapper>
					<div style={{ marginTop: 0 }}>
						<Link href="oidc" underline="none">
							OIDC認証を試す（Auth0）
						</Link>
					</div>
					<div style={{ marginTop: 20 }}>
						<Link href="#" underline="none">
							SAML認証を試す
						</Link>
					</div>
					<div style={{ marginTop: 20 }}>
						<Link href="#" underline="none">
							Google OAuth認証を試す
						</Link>
					</div>
					<div style={{ marginTop: 20 }}>
						<Link href="id_pass" underline="none">
							ID/PASS認証を試す
						</Link>
					</div>
				</LinkWrapper>
			</Box>
		</>
	);
};

export default HomePage;

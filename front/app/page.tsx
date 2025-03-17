"use client";

import { Link } from "@mui/material";
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
			<div style={{ marginTop: 40, textAlign: "center" }}>
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
					<div>
						<Link href="id_pass" underline="none">
							ID/PASS認証を試す
						</Link>
					</div>
					<div style={{ marginTop: 20 }}>
						<Link href="#" underline="none">
							Google OAuth認証を試す
						</Link>
					</div>
					<div style={{ marginTop: 20 }}>
						<Link href="#" underline="none">
							SAML認証を試す
						</Link>
					</div>
					<div style={{ marginTop: 20 }}>
						<Link href="oidc" underline="none">
							OIDC認証を試す（Auth0）
						</Link>
					</div>
				</LinkWrapper>
			</div>
		</>
	);
};

export default HomePage;

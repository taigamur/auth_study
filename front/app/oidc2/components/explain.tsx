import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Container, Link } from "@mui/material";

export const Explain = () => {
	return (
		<Container sx={{ width: 700 }}>
			<Box sx={{ textAlign: "center" }}>
				<Link
					underline="none"
					href="https://zesty-address-ae0.notion.site/OIDC-1b47d2e4bbf88006a111e360577911e3?pvs=4"
					target="_blank"
				>
					<Box
						sx={{
							display: "flex",
							gap: 2,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<OpenInNewIcon fontSize="small" />
						<Box>OIDC認証の仕組み ( Notion )</Box>
					</Box>
				</Link>
			</Box>
			<Box sx={{ textAlign: "center", mt: 2 }}>
				<Link
					underline="none"
					href="https://zesty-address-ae0.notion.site/Google-1bc7d2e4bbf8809589e9cb30ef06cc9f"
					target="_blank"
				>
					<Box
						sx={{
							display: "flex",
							gap: 2,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<OpenInNewIcon fontSize="small" />
						<Box>Googleを利用した認証の仕組み ( Notion )</Box>
					</Box>
				</Link>
			</Box>
		</Container>
	);
};

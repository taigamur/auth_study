import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Container, Link } from "@mui/material";

export const Explain = () => {
	return (
		<Container sx={{ width: 700 }}>
			<Box sx={{ textAlign: "center" }}>
				<Link
					underline="none"
					href="https://zesty-address-ae0.notion.site/ID-PASSWORD-1b97d2e4bbf880d3bb9fd8f4b9a9f946?pvs=4"
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
						<Box>この認証方法の仕組み ( Notion )</Box>
					</Box>
				</Link>
			</Box>
		</Container>
	);
};

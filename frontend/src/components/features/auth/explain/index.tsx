import { Box, Container, Link } from "@mui/material";
import { HeadingTitle } from "../../../common/heading_title";

export const Explain = () => {
	return (
		<Container sx={{ marginTop: 5, width: 700 }}>
			<Box sx={{ textAlign: "center" }}>
				<HeadingTitle title="この認証方法の仕組み" />
				<Link
					underline="none"
					href="https://github.com/taigamur/auth_study/blob/main/frontend/src/components/features/auth/explain/explain.md"
					target="_blank"
				>
					GitHubのMarkdownページ
				</Link>
			</Box>
		</Container>
	);
};

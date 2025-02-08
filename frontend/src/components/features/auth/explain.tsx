import { Box, Container, Link, Typography } from "@mui/material";
import { HeadingTitle } from "../../common/heading_title";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkGfm from "remark-gfm";

export const Explain = () => {
	const text = `
* このページではID/PASSを使用した認証方法を説明
* クライアント側からID/PASSを送信
* サーバー側でPASSをハッシュ化してDBに保存
* IDをjwt_tokenに変換してsessionに"session"というkeyで保存
* クライアントは都度sessionを送り、サーバー側でユーザーを検証している
* [ ] todo
`;

	const codeString = `
  # test
  yarn install
  `;

	return (
		<Container sx={{ marginTop: 5, width: 700 }}>
			<Box sx={{ textAlign: "center" }}>
				<HeadingTitle title="この認証方法の仕組み" />
				<Link
					underline="none"
					href="https://github.com/taigamur/auth_study/blob/main/frontend/src/components/features/auth/explain.tsx"
					target="_blank"
				>
					GitHubのMarkdownページ
				</Link>
			</Box>

			{/* <Box>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
				<SyntaxHighlighter language="javascript" style={darcula}>
					{codeString}
				</SyntaxHighlighter>
			</Box> */}
		</Container>
	);
};

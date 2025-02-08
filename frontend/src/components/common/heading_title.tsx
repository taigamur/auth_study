import { Typography } from "@mui/material";

interface TitleProps {
	title: string;
}

export const HeadingTitle = ({ title }: TitleProps) => {
	return (
		<Typography variant="h6" gutterBottom>
			{title}
		</Typography>
	);
};

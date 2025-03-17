import Provider from "./provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Provider>{children} </Provider>
		</>
	);
};

export default Layout;

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type User = { name: string } | null;

const AuthContext = createContext<{
	user: User;
	login: (user: User) => void;
	logout: () => void;
}>({
	user: null,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User>(null);

	const login = (user: User) => {
		setUser(user);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

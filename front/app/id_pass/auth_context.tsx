"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { authApi } from "./api";

type User = { name: string; token: string } | null;

const AuthContext = createContext<{
	user: User;
	signup: (name: string, password: string) => void;
	login: (name: string, password: string) => void;
	logout: () => void;
}>({
	user: null,
	signup: () => {},
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User>(() => {
		const token = sessionStorage.getItem("token");
		const name = sessionStorage.getItem("name");
		return token && name ? { name, token } : null;
	});

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (token) {
			const fetchUser = async () => {
				try {
					const data = await authApi.fetchUser();
					setUser({ name: data.name, token: data.token });
				} catch (error) {
					console.error("ユーザー取得エラー", error);
					setUser(null);
				}
			};
			fetchUser();
		}
	}, []);

	const login = async (name: string, password: string) => {
		try {
			const data = await authApi.login(name, password);
			const token = data.token;
			sessionStorage.setItem("token", token);
			sessionStorage.setItem("name", name);
			setUser({ name, token });
		} catch (error) {
			console.error("ログインエラー", error);
			throw error;
		}
	};

	const signup = async (name: string, password: string) => {
		try {
			const data = await authApi.signup(name, password);
			const token = data.token;
			sessionStorage.setItem("token", token);
			sessionStorage.setItem("name", name);
			setUser({ name, token });
		} catch (error) {
			console.error("サインアップエラー", error);
			throw error;
		}
	};

	const logout = () => {
		setUser(null);
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("name");
	};

	return (
		<AuthContext.Provider value={{ user, signup, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

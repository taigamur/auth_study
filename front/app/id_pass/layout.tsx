"use client";

import { AuthProvider } from "./auth_context";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<div>{children}</div>
		</AuthProvider>
	);
}

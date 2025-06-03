import { createContext, JSX, ReactNode, useEffect, useState } from "react";

import api from "../services/api";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

interface AuthContextData {
	user: UserProps | null;
	handleLogin: (email: string, password: string) => Promise<void>;
	handleSignUp: (
		name: string,
		email: string,
		password: string
	) => Promise<void>;
	handleLogOut: () => Promise<void>;
	loadingAuth: boolean;
	isAutenticated: boolean;
	handleToast: (type: "error" | "success" | "info", text: string) => void;
}

interface UserProps {
	email: string;
	name: string;
	balance: number;
	id: string;
}

interface ContextProps {
	children: ReactNode;
}

const defaultContextValue: AuthContextData = {
	user: null,
	handleLogin: async () => {},
	handleSignUp: async () => {},
	handleLogOut: async () => {},
	loadingAuth: false,
	isAutenticated: false,
	handleToast: () => {},
};

export const AuthContext = createContext<AuthContextData>(defaultContextValue);

export default function AuthContextProvider({
	children,
}: ContextProps): JSX.Element {
	const [user, setUser] = useState<UserProps | null>(null);
	const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

	useEffect(() => {
		loadUserLocal();
	}, []);

	function handleToast(type: "error" | "success" | "info", text: string) {
		Toast.show({
			type: type,
			text1: text,
		});
	}

	async function handleLogin(email: string, password: string) {
		if (!email || !password) return;
		setLoadingAuth(true);
		try {
			const response = await api.post("/login", {
				email: email,
				password: password,
			});
			await validateUser(response.data?.token);
		} catch (error: AxiosError | any) {
			console.log(error);
			if (error instanceof Error) {
				handleToast("error", error.message);
			} else {
				handleToast("error", "Erro inesperado.");
			}
		} finally {
			setLoadingAuth(false);
		}
	}

	async function validateUser(token: string) {
		if (!token) return;
		try {
			const response = await api.get("/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			handleToast("success", "Logado com sucesso!");
			setUser({
				balance: response?.data?.balance,
				id: response?.data?.id,
				email: response?.data?.email,
				name: response?.data?.name,
			});
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			await handleAddLocalUser(token);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleAddLocalUser(token: string) {
		try {
			await AsyncStorage.setItem("@financeExpo:token", token);
		} catch (error) {
			console.log(error);
		}
	}

	async function loadUserLocal() {
		setLoadingAuth(true);
		try {
			const token = await AsyncStorage.getItem("@financeExpo:token");
			if (token) {
				await validateUser(token);
			}
		} catch (error) {
			handleLogOut();
		} finally {
			setLoadingAuth(false);
		}
	}

	async function handleLogOut() {
		try {
			await AsyncStorage.removeItem("@financeExpo:token");
			handleToast("success", "Deslogado com sucesso!");
			setUser(null);
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				handleToast("error", error.message);
			} else {
				handleToast("error", "Erro inesperado.");
			}
		}
	}

	async function handleSignUp(name: string, email: string, password: string) {
		if (!name || !email || !password) return;
		setLoadingAuth(true);
		try {
			await api.post("/users", {
				name: name,
				email: email,
				password: password,
			});
			handleToast("success", "Usuario cadastrado com sucesso!");
		} catch (error: AxiosError | any) {
			if (error.response?.data.error === "User already exists") {
				handleToast("info", "Usuario já existe");
			}
			console.log(error);
			if (error instanceof Error) {
				handleToast("error", error.message);
			} else {
				handleToast("error", "Erro inesperado.");
			}
		} finally {
			setLoadingAuth(false);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				handleLogin,
				handleLogOut,
				handleSignUp,
				user,
				loadingAuth,
				isAutenticated: !!user,
				handleToast,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

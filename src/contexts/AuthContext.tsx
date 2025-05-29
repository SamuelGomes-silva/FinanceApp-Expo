import { createContext, JSX, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
import api from "../services/api";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
			setUser({
				balance: response?.data?.balance,
				id: response?.data?.id,
				email: response?.data?.email,
				name: response?.data?.name,
			});
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
				validateUser(token);
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
			setUser(null);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSignUp(name: string, email: string, password: string) {
		if (!name || !email || !password) return;
		setLoadingAuth(true);
		try {
			const response = await api.post("/users", {
				name: name,
				email: email,
				password: password,
			});
		} catch (error: AxiosError | any) {
			if (error.response?.data.error === "User already exists") {
				Alert.alert("Usuario já existe");
			}
			console.log(error);
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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

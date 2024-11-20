/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useEffect, useState, type ReactNode } from "react";
import api from "../services/api";
import type { RefreshToken, User } from "../types/DatasTypes";
import type { IResponseSignIn, IResponseSignUp } from "../types/ResponsesTypes";
import { storage } from "../utils/storage";
import errorHandler from "../helpers/errorHandler";

type SignUpData = {
	name: string;
	email: string;
	password: string;
}

type SignInData = {
	email: string;
	password: string;
}

type AuthContextType = {
	user: User | null;
	signUp: (data: SignUpData) => Promise<void>;
	signIn: (data: SignInData) => Promise<void>;
	signOut: () => void;
	isAuthenticated: boolean;
	isLoading: boolean;
	erroMessage: string | null;
	isError: boolean;
}

const authContext = createContext({} as AuthContextType);

function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [erroMessage, setErroMessage] = useState<string | null>(null);

	useEffect(() => {
		const loadStorageData = async () => {
			try {
				const storageUser = storage.get("@Auth:user");
				const storageToken = storage.get("@Auth:token");
				const refreshToken = storage.get("@Auth:refreshToken");

				if (storageUser && storageToken && refreshToken) {
					const parsedRefreshToken: RefreshToken = JSON.parse(refreshToken);

					const refreshTokenResponse = await api.post<{
						token: string, refreshToken: RefreshToken | undefined
					}>("refresh-token", { refreshTokenId: parsedRefreshToken.id });


					if (refreshTokenResponse.status !== 200) {
						storage.remove("@Auth:user");
						storage.remove("@Auth:token");
						storage.remove("@Auth:refreshToken");

						setUser(null);
						return;
					}

					const { refreshToken: newRefreshToken, token: newToken } = refreshTokenResponse.data;

					storage.set("@Auth:token", newToken);

					if (newRefreshToken) {
						storage.set("@Auth:refreshToken", JSON.stringify(newRefreshToken));
					}

					setUser(JSON.parse(storageUser));
					api.defaults.headers.common.Authorization = `Bearer ${storageToken}`;
				}
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			} catch (error: any) {
				console.error(error);
				setIsError(true);
			}
		}
		loadStorageData();
		setIsLoading(false);
	}, [])

	const signUp = async ({ name, email, password }: SignUpData) => {
		setIsLoading(true);
		try {
			const response = await api.post<IResponseSignUp>('create-user', { name, email, password });

			const { user, token, refreshToken } = response.data;

			setUser(user);
			api.defaults.headers.common.Authorization = `Bearer ${token}`;

			storage.set("@Auth:user", JSON.stringify(user));
			storage.set("@Auth:token", token);
			storage.set("@Auth:refreshToken", JSON.stringify(refreshToken));

			setIsError(false);
			setIsLoading(false);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			console.error(error);

			const errorMessage = errorHandler(error);
			setErroMessage(errorMessage);

			setIsError(true);
			setIsLoading(false);
		}
	}

	const signIn = async ({ email, password }: SignInData) => {
		setIsLoading(true);
		try {
			const response = await api.post<IResponseSignIn>('login', { email, password });

			const { user, token, refreshToken } = response.data;

			setUser(user);

			api.defaults.headers.common.Authorization = `Bearer ${token}`;

			storage.set("@Auth:user", JSON.stringify(user));
			storage.set("@Auth:token", JSON.stringify(token));
			storage.set("@Auth:refreshToken", JSON.stringify(refreshToken));

			setIsLoading(false);
			setIsError(false);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			console.error(error);
			setIsError(true);
			const errorMessage = errorHandler(error);
			setErroMessage(errorMessage);

			setIsLoading(false);
		}
	}

	const signOut = () => {
		storage.remove("@Auth:user");
		storage.remove("@Auth:token");

		setUser(null);
	}

	return (
		<authContext.Provider value={{
			user,
			signUp,
			signIn,
			signOut,
			isAuthenticated: !!user,
			isLoading,
			erroMessage,
			isError
		}}>
			{children}
		</authContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(authContext);
}

export default AuthProvider;

import type { RefreshToken, User } from "./DatasTypes";

export type IResponseCreateNote = {
	id: string;
	title: string;
	content: string;
	userId: number;
	createdAt: string;
}

export interface IResponseSignUp {
	user: User;
	token: string;
	refreshToken: RefreshToken
}

export interface IResponseSignIn {
	user: User;
	token: string;
	refreshToken: RefreshToken
}
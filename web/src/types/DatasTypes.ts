export type CategoryType = {
	id: string;
	name: string;
}

export type NoteType = {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	category: CategoryType
}

export type User = {
	id: string;
	name: string;
	email: string;
}

export type RefreshToken = {
	id: string;
	expiresIn: number;
	userId: string;
}
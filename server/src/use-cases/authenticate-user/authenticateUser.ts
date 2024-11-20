import { prisma } from "@/lib/prisma-client";
import { generateRefreshToken } from "@/provider/generate-refresh-token";
import { generateToken } from "@/provider/generate-token";
import { compare } from "bcryptjs";

interface AuthenticateUserInput {
	email: string;
	password: string;
}

export default async function authenticateUser(data: AuthenticateUserInput) {
	const { email, password } = data;

	const userAlreadyExists = await prisma.user.findFirst({
		where: {
			email,
		},
		select: {
			name: true,
			id: true,
			email: true,
			password: true,
		}
	});
	if (!userAlreadyExists) {
		throw new Error("Usuário ou senha incorreta.");
	}

	const passWordMatch = await compare(password, userAlreadyExists.password);
	if (!passWordMatch) {
		throw new Error("Usuário ou senha incorreta.");
	}
	const token = generateToken(userAlreadyExists.id);

	const refreshToken = await generateRefreshToken(userAlreadyExists.id);

	return { 
		token, 
		refreshToken, 
		user: {
			name: userAlreadyExists.name,
			email: userAlreadyExists.email,
			id: userAlreadyExists.id
		} 
	};
}

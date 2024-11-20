import { prisma } from "@/lib/prisma-client";
import { generateRefreshToken } from "@/provider/generate-refresh-token";
import { generateToken } from "@/provider/generate-token";
import type { CreateUserInput } from "@/routes/user/create-user-router";
import { hash } from "bcryptjs";

export default async function createUser(data: CreateUserInput) {
	const { name, email, password } = data;
	try {
		const userAlreadyExists = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		if (userAlreadyExists) {
			throw new Error("Usuário já existe");
		}

		const passWordHash = await hash(password, 8);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: passWordHash,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		if (user) {
			const token = generateToken(user.id);
			const refreshToken = await generateRefreshToken(user.id);

			return { user, token, refreshToken };
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

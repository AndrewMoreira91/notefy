import { prisma } from "@/lib/prisma-client";
import dayjs from "dayjs";

async function generateRefreshToken(userId: string) {
	try {
		await prisma.refreshToken.deleteMany({
			where: {
				userId,
			},
		});

		const expiresIn = dayjs().add(10, "day").unix();

		const generateRefreshToken = await prisma.refreshToken.create({
			data: {
				userId,
				expiresIn
			},
		})

		return generateRefreshToken;
	} catch (error) {
		throw new Error(error);
	}
}

export { generateRefreshToken };

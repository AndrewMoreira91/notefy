import { prisma } from "@/lib/prisma-client";
import { generateToken } from "@/provider/generate-token";
import { generateRefreshToken } from "@/provider/generate-refresh-token";
import dayjs from "dayjs";

async function refreshTokenUser(refreshTokenId: string) {
	const refreshToken = await prisma.refreshToken.findFirst({
		where: {
			id: refreshTokenId,
		},
	})
	if (!refreshToken) {
		throw new Error("Refresh token não encontrado");
	}
	const token = generateToken(refreshToken.userId);

	const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
	if (refreshTokenExpired) {
		const newRefreshToken = await generateRefreshToken(refreshToken.userId);

		return { token, refreshToken: newRefreshToken };
	}

	return { token };
}

export { refreshTokenUser };
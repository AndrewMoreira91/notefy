import { prisma } from "@/lib/prisma-client";
import findUser from "@/utils/prisma/find-user";

export async function getCategories(userId: string) {
	const user = await findUser(userId);
	if (!user) {
		throw new Error("Usuário não encontrado");
	}

	const categories = await prisma.category.findMany({
		where: {
			userId
		},
		select: {
			id: true,
			name: true,
		}
	})

	return categories;
}
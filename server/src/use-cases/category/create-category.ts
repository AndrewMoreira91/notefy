import { prisma } from "@/lib/prisma-client";
import type { CreateCategoryInput } from "@/routes/category/create-category-router";
import findUser from "@/utils/prisma/find-user";

export default async function createCategory(data: CreateCategoryInput) {
	const { name, userId } = data;

	const user = await findUser(userId);
	if (!user) {
		throw new Error("Usuário não encontrado");
	}

	const category = await prisma.category.create({
		data: {
			name,
			userId,
		},
		select: {
			id: true,
			name: true,
		},
	});

	return category;
}

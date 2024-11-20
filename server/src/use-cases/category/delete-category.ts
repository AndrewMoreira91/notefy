import { prisma } from "@/lib/prisma-client";

async function deleteCategory(categoryId: string) {
	const categoryExists = await prisma.category.findFirst({
		where: {
			id: categoryId,
		},
	});
	if (!categoryExists) {
		throw new Error("Categoria não encontrada.");
	}

	await prisma.category.delete({
		where: {
			id: categoryId,
		},
	});

	return { message: "Categoria deletada com sucesso", status: 204 };
}

export default deleteCategory;
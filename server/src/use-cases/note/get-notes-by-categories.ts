import { prisma } from "@/lib/prisma-client";

async function getNotesByCategories(userId: string) {
		const categories = await prisma.note.groupBy({
			by: ['categoryId'],
			where: {
				userId
			}
		})

		const notes = categories.flatMap(async (category) => {
			const notes = await prisma.note.findMany({
				where: {
					categoryId: category.categoryId
				},
				select: {
					id: true,
					title: true,
					content: true,
					createdAt: true,
					updatedAt: true,
					category: {
						select: {
							id: true,
							name: true
						}
					}
				}
			})

			if (!category.categoryId) {
				return {
					categoryId: null,
					categoryName: 'Sem categoria',
					notes
				}
			}

			const categoryData = await prisma.category.findUnique({
				where: {
					id: category.categoryId
				},
				select: {
					id: true,
					name: true
				}
			});

			return {
				categoryId: categoryData.id,
				categoryName: categoryData.name,
				notes
			}
		})

		return Promise.all(notes);
}

export { getNotesByCategories };
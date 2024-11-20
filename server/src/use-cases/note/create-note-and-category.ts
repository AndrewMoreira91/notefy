import findUser from "@/utils/prisma/find-user";
import { prisma } from "@/lib/prisma-client";
import type { Prisma } from "@prisma/client";
import { DefaultArgs, NameArgs } from "@prisma/client/runtime/library";

export interface CreateNoteAndCategoryInput {
	title: string;
	content: string;
	categoryName: string;
	userId: string;
}

async function createNoteAndCategory(input: CreateNoteAndCategoryInput) {
	const { categoryName, content, title, userId } = input;

	const userAlreadyExists = await findUser(userId);
	if (!userAlreadyExists) {
		throw new Error("Usuário não encontrado.");
	}

	const categoryAlreadyExists = await prisma.category.findFirst({
		where: {
			userId,
			name: categoryName,
		},
	});

	let category: { id: string };

	if (!categoryAlreadyExists) {
		category = await prisma.category.create({
			data: {
				name: categoryName,
				user: {
					connect: {
						id: userId,
					},
				},
			},
			select: {
				id: true,
			},
		});
	}

	const note = await prisma.note.create({
		data: {
			content,
			title,
			userId,
			categoryId: categoryAlreadyExists ? categoryAlreadyExists.id : category.id,
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
		},
	})

	return note;
}

export default createNoteAndCategory;
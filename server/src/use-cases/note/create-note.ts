import { prisma } from "@/lib/prisma-client";
import type { CreateNoteInput } from "@/routes/note/create-note-router";
import findCategory from "@/utils/prisma/find-category";
import findUser from "@/utils/prisma/find-user";

export default async function createNote(data: CreateNoteInput) {
	const { title, content, categoryId, userId } = data;

	const user = await findUser(userId);
	if (!user) {
		throw new Error("Usuário não encontrado");
	}

	if (categoryId) {
		const category = await findCategory(categoryId);
		if (!category) {
			throw new Error("Categoria não encontrada");
		}
	}

	const newNote = await prisma.note.create({
		data: {
			title,
			content,
			categoryId,
			userId,
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
	});

	return newNote;
}

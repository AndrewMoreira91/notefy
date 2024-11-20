import { prisma } from "@/lib/prisma-client"

type UpdateNoteData = {
	id: string;
	title?: string;
	content?: string;
	categoryId?: string;
}

export async function updateNote(data: UpdateNoteData) {
	const { id, title, content, categoryId } = data;
	const note = await prisma.note.findUnique({
		where: {
			id
		}
	});

	if (!note) {
		throw new Error("Nota não encontrada");
	}

	if (!title && !content && !categoryId) {
		throw new Error("Nenhum dado foi informado para atualização");
	}

	const response = await prisma.note.update({
		where: {
			id
		},
		data: {
			title,
			content,
			categoryId
		}
	});
	if (!response) {
		throw new Error("Nota não encontrada");
	}

	return { status: 204, message: "Nota atualizada com sucesso" };
}
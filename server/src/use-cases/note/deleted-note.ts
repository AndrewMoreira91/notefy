import { prisma } from "@/lib/prisma-client";

async function deleteNote(noteId: string) {
	const note = await prisma.note.findUnique({
		where: {
			id: noteId,
		},
	});
	if (!note) {
		throw new Error("Nota não encontrada");
	}

	const deletedNote = await prisma.note.delete({
		where: {
			id: noteId,
		},
		select: {
			id: true,
		}
	});

	if (deletedNote) {
		return { message: "Nota deletada com sucesso", status: 204 };
	}
}

export { deleteNote };
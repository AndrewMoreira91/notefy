import { prisma } from "@/lib/prisma-client";

export default async function getNoteById(id: string) {
	const note = await prisma.note.findUnique({
		where: {
			id,
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

	if (!note) {
		throw new Error("Nota não encontrada");
	}

	return note;
}

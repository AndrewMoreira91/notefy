import { prisma } from "@/lib/prisma-client";

export default async function getNotes(userId: string) {
	const notes = await prisma.note.findMany({
		where: {
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

	return notes;
}

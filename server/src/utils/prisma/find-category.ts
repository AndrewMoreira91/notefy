import { prisma } from "@/lib/prisma-client";

export default async function findCategory(id: string) {
	return await prisma.category.findUnique({
		where: {
			id,
		},
	});
}

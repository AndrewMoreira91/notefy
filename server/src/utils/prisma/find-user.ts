import { prisma } from "@/lib/prisma-client";

export default async function findUser(id: string) {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	});
}

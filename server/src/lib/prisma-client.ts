import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$connect().then(() => {
	console.log("Conectado ao banco de dados");
}).catch((error) => {
	console.error("Erro ao conectar ao banco de dados", error);
});

export { prisma };

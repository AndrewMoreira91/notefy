import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

async function seed() {
	await prisma.refreshToken.deleteMany();
	await prisma.category.deleteMany();
	await prisma.note.deleteMany();
	await prisma.user.deleteMany();

	const maria = await prisma.user.upsert({
		where: { email: "maria.oliveira@example.com" },
		update: {},
		create: {
			name: "Maria Oliveira",
			email: "maria.oliveira@example.com",
			password: await hash("123456", 8),
			notes: {
				create: [
					{
						title: "Primeira nota de Maria",
						content: "Conteúdo da primeira nota de Maria",
					},
					{
						title: "Segunda nota de Maria",
						content: "Conteúdo da segunda nota de Maria",
					},
				],
			},
		},
	});

	const carlos = await prisma.user.upsert({
		where: { email: "carlos.souza@example.com" },
		update: {},
		create: {
			name: "Carlos Souza",
			email: "carlos.souza@example.com",
			password: await hash("password789", 8),
			notes: {
				create: [
					{
						title: "Primeira nota de Carlos",
						content: "Conteúdo da primeira nota de Carlos",
					},
					{
						title: "Segunda nota de Carlos",
						content: "Conteúdo da segunda nota de Carlos",
					},
				],
			},
		},
	});

	const ana = await prisma.user.upsert({
		where: { email: "ana.santos@example.com" },
		update: {},
		create: {
			name: "Ana Santos",
			email: "ana.santos@example.com",
			password: await hash("senha123", 8),
			notes: {
				create: [
					{
						title: "Primeira nota de Ana",
						content: "Conteúdo da primeira nota de Ana",
					},
					{
						title: "Segunda nota de Ana",
						content: "Conteúdo da segunda nota de Ana",
					},
				],
			},
		},
	});

	const fernanda = await prisma.user.upsert({
		where: { email: "fernanda.lima@example.com" },
		update: {},
		create: {
			name: "Fernanda Lima",
			email: "fernanda.lima@example.com",
			password: await hash("abc123xyz", 8),
			notes: {
				create: [
					{
						title: "Primeira nota de Fernanda",
						content: "Conteúdo da primeira nota de Fernanda",
					},
					{
						title: "Segunda nota de Fernanda",
						content: "Conteúdo da segunda nota de Fernanda",
					},
				],
			},
		},
	});

	const categorymaria = await prisma.category.create({
		data: {
			name: "Trabalho",
			userId: maria.id,
		},
		select: {
			id: true,
			name: true,
		},
	});

	await prisma.note.updateMany({
		where: {
			userId: maria.id,
		},
		data: {
			categoryId: categorymaria.id,
		},
	});

	const categoryCarlos = await prisma.category.create({
		data: {
			name: "Estudos",
			userId: carlos.id,
		},
		select: {
			id: true,
			name: true,
		},
	});
	await prisma.note.updateMany({
		where: {
			userId: carlos.id,
		},
		data: {
			categoryId: categoryCarlos.id,
		},
	});

	console.log({ maria, carlos, ana, fernanda });
}

seed()
	.then(async () => {
		console.log("Seed executado com sucesso!");
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error("Erro ao executar seed:", error);
		await prisma.$disconnect();
		process.exit(1);
	});

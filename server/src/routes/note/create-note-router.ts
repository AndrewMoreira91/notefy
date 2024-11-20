import errorHandler from "@/error/handleError";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import createNote from "@/use-cases/note/create-note";
import { Router } from "express";
import z, { ZodError } from "zod";

const router = Router();

export type CreateNoteInput = {
	title: string;
	content: string;
	categoryId?: string;
	userId: string;
};

router.post("/create-note/:userId", ensureAuthenticated, async (req, res) => {
	try {
		const bodySchema = z.object({
			title: z.string().min(1).max(100),
			content: z.string().max(500),
			categoryId: z.string().optional(),
		});

		const paramsSchema = z.object({
			userId: z.string().cuid(),
		});

		const { title, content, categoryId } = bodySchema.parse(req.body);
		const { userId } = paramsSchema.parse(req.params);

		const newNote = await createNote({
			title,
			content,
			categoryId,
			userId,
		});

		res.status(201).json(newNote);
	} catch (error) {
		errorHandler(error, req, res, () => {});
	}
});

export { router as createNoteRouter };

import errorHandler from "@/error/handleError";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { updateNote } from "@/use-cases/note/update-note";
import { Router } from "express";
import { z } from "zod";

const router = Router();

router.put("/update-note/:id", ensureAuthenticated, async (req, res) => {
	const paramsSchema = z.object({
		id: z.string().cuid(),
	});
	const bodySchema = z.object({
		title: z.string().optional(),
		content: z.string().optional(),
		categoryId: z.string().cuid().optional(),
	});

	try {
		const { id } = paramsSchema.parse(req.params);
		const { title, content, categoryId } = bodySchema.parse(req.body);

		const response = await updateNote({id, title, content, categoryId});

		res.status(response.status).json(response.message);
	} catch (error) {
		errorHandler(error, req, res, null);
	}
});

export { router as updateNoteRouter };

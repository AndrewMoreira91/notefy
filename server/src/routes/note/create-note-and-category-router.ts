import errorHandler from "@/error/handleError";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import createNoteAndCategory from "@/use-cases/note/create-note-and-category";
import { Router } from "express";
import { z } from "zod";

const router = Router();

router.post("/create-note-and-category/:userId", ensureAuthenticated, async (req, res) => {
	try {
		const bodySchema = z.object({
			title: z.string(),
			content: z.string(),
			categoryName: z.string().trim().toLowerCase(),
		});
		const { categoryName, content, title } = bodySchema.parse(req.body);

		const paramsSchema = z.object({
			userId: z.string().cuid(),
		});
		const { userId } = paramsSchema.parse(req.params);

		const note = await createNoteAndCategory({
			title,
			content,
			categoryName,
			userId,
		});

		res.status(201).json(note);
	} catch (error) {
		errorHandler(error, req, res, () => { });
	}
});

export { router as createNoteAndCategoryRouter };
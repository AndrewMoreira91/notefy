import errorHandler from "@/error/handleError";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { getNotesByCategories } from "@/use-cases/note/get-notes-by-categories";
import { Router } from "express";
import { z } from "zod";

const router = Router();

router.get("/get-notes-by-categories/:userId", ensureAuthenticated, async (req, res) => {
	try {
		const paramsSchema = z.object({
			userId: z.string().cuid(),
		});
		const { userId } = paramsSchema.parse(req.params);

		const notesByCategory = await getNotesByCategories(userId)

		res.status(200).json(notesByCategory);
	} catch (error) {
		errorHandler(error, req, res, null);
	}
});

export { router as getNotesByCategoriesRouter };
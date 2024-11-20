import errorHandler from "@/error/handleError";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import getNotes from "@/use-cases/note/get-notes";
import { Router } from "express";
import { z } from "zod";

const router = Router();

router.get("/get-notes/:userId", ensureAuthenticated, async (req, res) => {
	const paramsSchema = z.object({
		userId: z.string().cuid(),
	});

	try {
		const { userId } = paramsSchema.parse(req.params);

		const notes = await getNotes(userId);

		res.status(200).json(notes);
	} catch (error) {
		errorHandler(error, req, res, null);
	}
});

export { router as getNotesRouter };

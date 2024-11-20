import errorHandler from "@/error/handleError";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { deleteNote } from "@/use-cases/note/deleted-note";
import { Router } from "express";
import { z } from "zod";

const router = Router();

router.delete("/delete-note/:id", ensureAuthenticated, async (req, res) => {
	const paramsSchema = z.object({
		id: z.string().cuid(),
	});

	try {
		const { id } = paramsSchema.parse(req.params);

		const response = await deleteNote(id);

		res.status(response.status).json(response);
	} catch (error) {
		errorHandler(error, req, res, () => { });
	}
});

export { router as deleteNoteRouter };

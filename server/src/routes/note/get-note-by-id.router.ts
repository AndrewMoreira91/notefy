import errorHandler from "@/error/handleError";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import getNoteById from "@/use-cases/note/get-note-by-id";
import { Router } from "express";
import { z } from "zod";

const router = Router();

router.get("/get-note/:id", ensureAuthenticated, async (req, res) => {
	try {
		const paramsSchema = z.object({
			id: z.string().cuid(),
		});

		const { id } = paramsSchema.parse(req.params);

		const note = await getNoteById(id);

		res.status(200).json(note);
	} catch (error) {
		errorHandler(error, req, res, () => {});
	}
});

export { router as getNoteByIdRouter };

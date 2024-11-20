import { Router } from "express";
import { z } from "zod";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { getCategories } from "@/use-cases/category/get-categories";
import errorHandler from "@/error/handleError";

const router = Router();

router.get("/get-categories/:userId", ensureAuthenticated, async (req, res) => {
	try {
		const paramsSchema = z.object({
			userId: z.string().cuid(),
		});
		const { userId } = paramsSchema.parse(req.params);

		const categories = await getCategories(userId);

		res.status(200).json(categories);
	} catch (error) {
		errorHandler(error, req, res, null);
	}
});

export { router as getCategoriesRouter };
import deleteCategory from "@/use-cases/category/delete-category";
import { Router } from "express";
import { z } from "zod";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import errorHandler from "@/error/handleError";

const router = Router();

router.delete("/delete-category/:id", ensureAuthenticated, async (req, res) => {
	try {
		const paramsSchema = z.object({
			id: z.string().cuid(),
		});
		const { id } = paramsSchema.parse(req.params);

		const response = await deleteCategory(id);

		res.status(response.status).json(response);
	} catch (error) {
		errorHandler(error, req, res, null)
	}
});

export { router as deleteCategoryRouter };
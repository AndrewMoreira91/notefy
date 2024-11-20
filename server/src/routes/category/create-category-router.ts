import errorHandler from "@/error/handleError";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import createCategory from "@/use-cases/category/create-category";
import { Router } from "express";
import { z } from "zod";

const router = Router();

export interface CreateCategoryInput {
	name: string;
	userId: string;
}

router.post("/create-category/:userId", ensureAuthenticated, async (req, res) => {
	try {
		const bodySchema = z.object({
			name: z.string().min(1).max(100),
		});
		const paramsSchema = z.object({
			userId: z.string().cuid(),
		});

		const { name } = bodySchema.parse(req.body);
		const { userId } = paramsSchema.parse(req.params);

		const category = await createCategory({ name, userId });

		res.status(201).json(category);
	} catch (error) {
		errorHandler(error, req, res, null);
	}
});

export { router as createCategoryRouter };

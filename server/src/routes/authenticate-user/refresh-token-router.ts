import errorHandler from "@/error/handleError";
import { refreshTokenUser } from "@/use-cases/authenticate-user/refresh-token-user";
import { Router } from "express";
import { z } from "zod";

const router = Router();

router.post("/refresh-token", async (req, res) => {
	try {
		const bodySchema = z.object({
			refreshTokenId: z.string(),
		});

		const { refreshTokenId } = bodySchema.parse(req.body);

		const token = await refreshTokenUser(refreshTokenId);

		res.status(200).json(token);
	} catch (error) {
		errorHandler(error, req, res, null);
	}
})

export { router as refreshTokenRouter };
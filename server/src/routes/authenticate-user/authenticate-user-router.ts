import errorHandler from "@/error/handleError";
import authenticateUser from "@/use-cases/authenticate-user/authenticateUser";
import { Router } from "express";
import { z } from "zod";

const router = Router();

router.post("/login", async (req, res) => {
	try {
		const bodySchema = z.object({
			email: z.string().email({message: "Email inválido"}),
			password: z.string(),
		});

		const { email, password } = bodySchema.parse(req.body);

		const response = await authenticateUser({ email, password });

		res.status(200).json(response);
	} catch (error) {
		errorHandler(error, req, res, () => {});
	}
});

export { router as authenticateUserRouter };

import errorHandler from "@/error/handleError";
import createUser from "@/use-cases/user/create-user";
import { Router } from "express";
import { z } from "zod";

const router = Router();

export interface CreateUserInput {
	name: string;
	email: string;
	password: string;
}

router.post("/create-user", async (req, res) => {
	try {
		const bodySchema = z.object({
			name: z.string({
				required_error: "O nome é obrigatório",
			}),
			email: z.string().email("Email inválido"),
			password: z.string(),
		});

		const { name, email, password } = bodySchema.parse(req.body);

		const user = await createUser({ name, email, password });

		res.status(201).json(user);
	} catch (error) {
		errorHandler(error, req, res, () => {});
	}
});

export { router as createUserRouter };

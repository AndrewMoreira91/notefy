import type { NextFunction, Response, Request } from "express";
import { ZodError } from "zod";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof ZodError) {
		res.status(400).json({ message: err.errors[0].message });
		return;
	}

	if (err instanceof Error) {
		return res.status(400).json({ message: err.message });
	}

	console.error(err);
	res.status(500).send({ errors: [{ message: 'Erro no servidor' }] });
}

export default errorHandler;
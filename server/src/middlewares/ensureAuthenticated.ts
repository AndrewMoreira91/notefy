import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET is not defined");
}

export function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authToken = request.headers.authorization;
	const schema = z.object({
		userId: z.string().optional(),
	});

	const { userId } = schema.parse(request.params);

	if (!authToken) {
		response.status(401).json({
			message: "Token de autorização ausente",
		});
		return;
	}

	const [, token] = authToken.split(" ");

	try {
		verify(token, JWT_SECRET, {
			subject: userId,
			ignoreExpiration: true,
		});

		next();
	} catch (error) {
		response.status(401).json({
			message: "Token de autorização inválido",
		});
	}
}
